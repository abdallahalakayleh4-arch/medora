// استيراد Firebase Auth
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// الحصول على auth instance
const auth = getAuth();

// مراقبة حالة تسجيل الدخول
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // إذا المستخدم مش مسجّل دخول
    window.location.href = "login.html";
  }
});
