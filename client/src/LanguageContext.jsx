import React, { createContext, useContext, useState } from 'react';

const TRANSLATIONS = {
  en: {
    // Navbar
    appName: 'KissanApp',
    home: 'Home',
    khetrent: 'KhetRent',
    warehouse: 'Warehouse',
    directSell: 'Direct Sell',
    soilDetection: 'Soil Detection',
    waterMgmt: 'Water Mgmt',
    machinery: 'Machinery',
    seeds: 'Seeds',
    payAfter: 'Pay After Harvest',
    advisory: 'Advisory',
    transportation: 'Transportation',
    insurance: 'Insurance',
    profile: 'Profile',
    logout: 'Logout',
    hi: 'Hi',

    // Home — shared
    location: 'Location',
    temperature: 'Temperature',
    weather: 'Weather',
    rainChances: 'Rain Chances',
    next3h: 'Next 3 hours',
    tomorrow: 'Tomorrow',
    dayAfter: 'Day After Tomorrow',
    rain: 'Rain',
    loadingWeather: 'Loading weather...',
    freshNews: 'Fresh News',
    loadingNews: 'Loading...',
    moreLink: 'More →',

    // Home — role headings & cards
    farmerWelcome: 'Welcome, Farmer!',
    providerWelcome: 'Welcome, Provider!',
    buyerWelcome: 'Welcome, Buyer!',

    farmerSubtitle: 'Manage your farm, crops & services from one place.',
    providerSubtitle: 'Manage your land, machinery & warehouses.',
    buyerSubtitle: 'Browse crops, warehouses & transportation.',

    quickAccess: 'Quick Access',
    seeds: 'Seeds',
    soilTest: 'Soil Test',
    waterLabel: 'Water',
    khetrentLabel: 'KhetRent',
    warehouseLabel: 'Warehouse',
    insuranceLabel: 'Insurance',
    transportLabel: 'Transport',
    advisoryLabel: 'Advisory',
    payAfterLabel: 'Pay After',
    machineryLabel: 'Machinery',
    addLand: 'Add Land',
    addWarehouse: 'Add Warehouse',
    addMachinery: 'Add Machinery',
    addTransport: 'Add Transport',
    buyCrops: 'Buy Crops',
    tipTitle: 'Tip of the Day',
    farmerTip: 'Check soil moisture before irrigation to save water and increase yield.',
    providerTip: 'Update your listings regularly to attract more farmers.',
    buyerTip: 'Compare crop quality grades before placing an order.',
  },

  hi: {
    // Navbar
    appName: 'किसान ऐप',
    home: 'होम',
    khetrent: 'खेत रेंट',
    warehouse: 'वेयरहाउस',
    directSell: 'सीधी बिक्री',
    soilDetection: 'मिट्टी परीक्षण',
    waterMgmt: 'जल प्रबंधन',
    machinery: 'मशीनरी',
    seeds: 'बीज',
    payAfter: 'फसल के बाद भुगतान',
    advisory: 'सलाह',
    transportation: 'परिवहन',
    insurance: 'बीमा',
    profile: 'प्रोफ़ाइल',
    logout: 'लॉग आउट',
    hi: 'नमस्ते',

    // Home — shared
    location: 'स्थान',
    temperature: 'तापमान',
    weather: 'मौसम',
    rainChances: 'वर्षा की संभावना',
    next3h: 'अगले 3 घंटे',
    tomorrow: 'कल',
    dayAfter: 'परसों',
    rain: 'वर्षा',
    loadingWeather: 'मौसम लोड हो रहा है...',
    freshNews: 'ताज़ा समाचार',
    loadingNews: 'लोड हो रहा है...',
    moreLink: 'और देखें →',

    // Home — role headings & cards
    farmerWelcome: 'स्वागत है, किसान!',
    providerWelcome: 'स्वागत है, प्रदाता!',
    buyerWelcome: 'स्वागत है, खरीदार!',

    farmerSubtitle: 'अपनी खेती, फसल और सेवाएं एक जगह से प्रबंधित करें।',
    providerSubtitle: 'अपनी जमीन, मशीनरी और वेयरहाउस प्रबंधित करें।',
    buyerSubtitle: 'फसल, वेयरहाउस और परिवहन देखें।',

    quickAccess: 'त्वरित पहुँच',
    seeds: 'बीज',
    soilTest: 'मिट्टी परीक्षण',
    waterLabel: 'पानी',
    khetrentLabel: 'खेत रेंट',
    warehouseLabel: 'वेयरहाउस',
    insuranceLabel: 'बीमा',
    transportLabel: 'परिवहन',
    advisoryLabel: 'सलाह',
    payAfterLabel: 'फसल के बाद',
    machineryLabel: 'मशीनरी',
    addLand: 'जमीन जोड़ें',
    addWarehouse: 'वेयरहाउस जोड़ें',
    addMachinery: 'मशीनरी जोड़ें',
    addTransport: 'परिवहन जोड़ें',
    buyCrops: 'फसल खरीदें',
    tipTitle: 'आज की सलाह',
    farmerTip: 'सिंचाई से पहले मिट्टी की नमी जांचें — पानी बचेगा, फसल बढ़ेगी।',
    providerTip: 'अपनी लिस्टिंग नियमित रूप से अपडेट करें ताकि अधिक किसान जुड़ें।',
    buyerTip: 'ऑर्डर देने से पहले फसल की गुणवत्ता ग्रेड जरूर देखें।',
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');

  const toggleLang = () => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    localStorage.setItem('appLang', next);
  };

  const t = (key) => TRANSLATIONS[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
