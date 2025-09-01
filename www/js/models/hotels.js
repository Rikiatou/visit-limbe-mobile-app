// Simple in-memory Hotels model with persistence to localStorage
export default class HotelsModel {
    constructor() {
        this.key = 'vl_model_hotels';
        this.items = this._load();
    }

    _load() {
        try { return JSON.parse(localStorage.getItem(this.key) || '[]'); } catch(e){ return []; }
    }

    _save() {
        try { localStorage.setItem(this.key, JSON.stringify(this.items)); } catch(e){ console.warn('save hotels failed', e); }
    }

    list() { return this.items.slice(); }

    get(id) { return this.items.find(i => i.id === id) || null; }

    create(data) {
        const item = Object.assign({ id: 'h_'+Date.now(), createdAt: Date.now() }, data);
        this.items.unshift(item);
        this._save();
        return item;
    }

    update(id, patch) {
        const idx = this.items.findIndex(i => i.id === id);
        if (idx === -1) return null;
        this.items[idx] = Object.assign({}, this.items[idx], patch, { updatedAt: Date.now() });
        this._save();
        return this.items[idx];
    }

    remove(id) {
        const idx = this.items.findIndex(i => i.id === id);
        if (idx === -1) return false;
        this.items.splice(idx,1);
        this._save();
        return true;
    }
}
