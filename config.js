/* =========================================================
   كوت المجلس — ملف الإعدادات (منفصل عن اللعبة)
   ---------------------------------------------------------
   • عند تحديث اللعبة ارفع index.html و game.js و style.css فقط،
     واترك هذا الملف كما هو حتى تبقى إعداداتك.
   • قيم Firebase ليست سرية (تظهر في أي موقع يستخدمها)، والحماية
     الحقيقية تكون بقواعد Firestore (ملف firestore.rules).
   • إذا تركت apiKey فارغاً تعمل اللعبة، لكن الحسابات تُحفظ في
     المتصفح فقط ولا يعمل نظام الأصدقاء.
   ========================================================= */
window.KOUT_CONFIG = {
  firebase: {
    apiKey: "AIzaSyBMGHjDZEIH47xPllexfNWv2oZs4o_DBCE",
    authDomain: "kout-majlis.firebaseapp.com",
    projectId: "kout-majlis",
    storageBucket: "kout-majlis.firebasestorage.app",
    messagingSenderId: "837101566744",
    appId: "1:837101566744:web:92a8c560f960a8b8a23c6d"
  },

  /* اختياري: خادم TURN للشبكات الصعبة (بعض شبكات الشركات والجوال).
     اللعب بين الدول يعمل بدونه في أغلب الحالات. مثال بعد التسجيل
     المجاني في metered.ca أو أي مزوّد TURN:
     iceServers: [
       { urls: "turn:global.relay.metered.ca:80", username: "USER", credential: "PASS" },
       { urls: "turn:global.relay.metered.ca:443?transport=tcp", username: "USER", credential: "PASS" }
     ]
  */
  iceServers: []
};
