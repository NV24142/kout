/**
 * ============================================================================
 *  كوت المجلس — ملف الإعدادات
 *  Kout Al Majlis — Runtime configuration
 * ============================================================================
 *
 *  هذا الملف منفصل عن اللعبة عمداً:
 *    • عند تحديث اللعبة ارفع index.html فقط، واترك هذا الملف كما هو.
 *    • اللعبة تقرأ الإعدادات من window.KOUT_CONFIG عند التشغيل.
 *
 *  ملاحظة أمنية:
 *    قيم Firebase العامة (apiKey وغيرها) ليست أسراراً؛ تظهر في أي موقع
 *    يستخدم Firebase. الحماية الفعلية تكون عبر قواعد Firestore
 *    (ملف firestore.rules) وقائمة النطاقات المسموحة في Firebase Auth.
 *    لا تضع هنا كلمات مرور أو مفاتيح خاصة (Service Account) أبداً.
 *
 *  الأقسام:
 *    1) FIREBASE     — الحفظ السحابي، الحسابات، الأصدقاء، الديوانيات، الغرف العامة
 *    2) ICE_SERVERS  — خوادم TURN اختيارية لتحسين الاتصال بين الأجهزة
 * ============================================================================
 */
(function (global) {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1) FIREBASE
   *    المصدر: Firebase Console › Project settings › Your apps › SDK setup.
   *    اترك apiKey فارغاً لتشغيل اللعبة بدون سحابة (الحسابات تُحفظ في
   *    المتصفح فقط، ولا تعمل الأصدقاء والديوانيات والغرف العامة).
   * ------------------------------------------------------------------------ */
  const FIREBASE = {
    apiKey:            'AIzaSyBMGHjDZEIH47xPllexfNWv2oZs4o_DBCE',
    authDomain:        'kout-majlis.firebaseapp.com',
    projectId:         'kout-majlis',
    storageBucket:     'kout-majlis.firebasestorage.app',
    messagingSenderId: '837101566744',
    appId:             '1:837101566744:web:92a8c560f960a8b8a23c6d',
  };

  /* --------------------------------------------------------------------------
   * 2) ICE_SERVERS (اختياري)
   *    اللعب بين الأجهزة يعمل عبر STUN المدمج في أغلب الشبكات.
   *    بعض شبكات الشركات والجوال تحتاج خادم TURN. بعد التسجيل لدى أي
   *    مزوّد (مثل metered.ca) أضف الخوادم بهذا الشكل:
   *
   *    { urls: 'turn:global.relay.metered.ca:80',                username: 'USER', credential: 'PASS' },
   *    { urls: 'turn:global.relay.metered.ca:443?transport=tcp', username: 'USER', credential: 'PASS' },
   * ------------------------------------------------------------------------ */
  const ICE_SERVERS = [
    // ضع خوادم TURN هنا عند الحاجة
  ];

  /* --------------------------------------------------------------------------
   * التحقق — ينبّه في Console عند وجود خطأ في الإعدادات دون إيقاف اللعبة.
   * ------------------------------------------------------------------------ */
  const REQUIRED_FIREBASE_KEYS = ['apiKey', 'authDomain', 'projectId', 'appId'];

  function validateFirebase(cfg) {
    if (!cfg.apiKey) {
      console.info('[Kout] Firebase غير مفعّل: اللعبة تعمل بالحفظ المحلي فقط.');
      return;
    }
    const missing = REQUIRED_FIREBASE_KEYS.filter((k) => !cfg[k]);
    if (missing.length) {
      console.warn('[Kout] إعدادات Firebase ناقصة:', missing.join(', '));
    }
  }

  function sanitizeIceServers(list) {
    if (!Array.isArray(list)) return [];
    return list.filter((s) => {
      const ok = s && (typeof s.urls === 'string' || Array.isArray(s.urls));
      if (!ok) console.warn('[Kout] تم تجاهل خادم ICE غير صالح:', s);
      return ok;
    });
  }

  validateFirebase(FIREBASE);

  /* --------------------------------------------------------------------------
   * التصدير — كائن مجمّد للقراءة فقط تستخدمه اللعبة.
   * ------------------------------------------------------------------------ */
  global.KOUT_CONFIG = Object.freeze({
    firebase:   Object.freeze({ ...FIREBASE }),
    iceServers: Object.freeze(sanitizeIceServers(ICE_SERVERS)),
  });
})(window);
