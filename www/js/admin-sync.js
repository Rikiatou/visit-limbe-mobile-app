// Lightweight Admin <-> User sync system
// Uses BroadcastChannel when available, falls back to localStorage 'vl_sync_event'
// API: adminSync.subscribe(cb), adminSync.publish(update)
(function(global){
    const channelName = 'vl_sync_channel';
    let bc = null;
    try { if ('BroadcastChannel' in window) bc = new BroadcastChannel(channelName); } catch(e) { bc = null; }

    const listeners = new Set();

    function notifyAll(msg) {
        listeners.forEach(cb => {
            try { cb(msg); } catch(e) { console.error('admin-sync listener error', e); }
        });
    }

    function onMessage(event) {
        let data = event && event.data ? event.data : event;
        if (typeof data === 'string') {
            try { data = JSON.parse(data); } catch(e){ }
        }
        notifyAll(data);
    }

    if (bc) {
        bc.addEventListener('message', onMessage);
    }

    window.addEventListener('storage', (e) => {
        if (!e.key) return;
        if (e.key === 'vl_sync_event') {
            try {
                const parsed = JSON.parse(e.newValue || '{}');
                onMessage(parsed);
            } catch(e) { }
        }
    });

    function publish(update) {
        const payload = Object.assign({ts: Date.now()}, update || {});
        // BroadcastChannel
        if (bc) {
            try { bc.postMessage(payload); } catch(e) { console.warn('bc post failed', e); }
        }
        // localStorage fallback
        try {
            localStorage.setItem('vl_sync_event', JSON.stringify(payload));
            // also write a timestamp key to force storage event in same tab environments
            localStorage.setItem('vl_sync_ts', String(Date.now()));
        } catch(e) { console.warn('localStorage sync failed', e); }
        // notify same-tab listeners as well
        notifyAll(payload);
    }

    function subscribe(cb) {
        if (typeof cb !== 'function') throw new Error('subscribe requires a function');
        listeners.add(cb);
        // return unsubscribe
        return () => listeners.delete(cb);
    }

    function getLastEvent() {
        try { return JSON.parse(localStorage.getItem('vl_sync_event') || 'null'); } catch(e){ return null; }
    }

    // expose
    const adminSync = { publish, subscribe, getLastEvent };
    global.adminSync = adminSync;
    if (typeof module !== 'undefined' && module.exports) module.exports = adminSync;
})(window);
