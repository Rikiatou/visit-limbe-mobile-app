#!/bin/bash
# Test de l'APK Visit Limbe - Script de validation

echo "🧪 Script de test APK Visit Limbe"
echo "================================="

APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"

# Vérifier que l'APK existe
if [ ! -f "$APK_PATH" ]; then
    echo "❌ APK introuvable : $APK_PATH"
    exit 1
fi

echo "✅ APK trouvé : $APK_PATH"
echo "📊 Taille APK : $(du -h "$APK_PATH" | cut -f1)"

# Vérifier les appareils connectés
echo ""
echo "📱 Appareils connectés :"
adb devices

# Si aucun appareil connecté, instructions
if [ "$(adb devices | grep -v "List of devices attached" | wc -l)" -eq 1 ]; then
    echo ""
    echo "⚠️  Aucun appareil détecté"
    echo "📋 Pour tester l'APK :"
    echo "   1. Connecte ton téléphone avec USB Debugging activé"
    echo "   2. Ou lance un émulateur Android"
    echo "   3. Puis relance ce script"
    echo ""
    echo "🚀 Installation manuelle :"
    echo "   adb install -r \"$APK_PATH\""
else
    echo ""
    echo "🚀 Installation de l'APK..."
    adb install -r "$APK_PATH"
    
    if [ $? -eq 0 ]; then
        echo "✅ APK installé avec succès !"
        echo ""
        echo "📋 Test checklist :"
        echo "   1. Ouvre l'app 'Visit Limbe'"
        echo "   2. Vérifie que l'écran de chargement disparaît"
        echo "   3. Teste les modules principaux"
        echo "   4. Pour debug WebView : chrome://inspect"
    else
        echo "❌ Échec de l'installation"
    fi
fi

echo ""
echo "🔗 Pour monitoring build Bitrise :"
echo "   https://app.bitrise.io/app/YOUR_APP_ID"
