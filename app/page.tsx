"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Bell,
  Home,
  Briefcase,
  MessageCircle,
  User,
  MapPin,
  Clock,
  Star,
  Calendar,
  ChevronRight,
  Mail,
  Lock,
  BadgeCheck,
  Award,
  UtensilsCrossed,
  Bike,
  Receipt,
  Sparkles,
  Package,
  HardHat,
  LayoutGrid,
  CheckCircle2,
  FileText,
  Send,
  Settings,
  CreditCard,
  Globe,
  LifeBuoy,
  LogOut,
  Plus,
  X,
  Phone,
  List,
  Map,
  Heart,
  SlidersHorizontal,
  Zap,
  Download,
  Wallet,
  Camera,
  Shield,
  Users,
  Laptop,
  Sparkle,
  CalendarPlus,
  TrendingUp,
  ShieldCheck,
  Radar,
  Moon,
  Sun,
  Flame,
  Crown,
  Compass,
  Smile,
  Coffee,
  Truck,
  FlameKindling,
  Trophy,
  Loader2,
  Landmark
} from "lucide-react";

const COLORS = {
  primary: "var(--c-primary)",
  secondary: "var(--c-secondary)",
  accent: "var(--c-accent)",
  success: "var(--c-success)",
  bg: "var(--c-bg)",
  white: "var(--c-white)",
  border: "var(--c-border)",
  muted: "var(--c-muted)",
  textLight: "var(--c-text-light)",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

:root {
  --c-primary: #2563EB;
  --c-secondary: #0F172A;
  --c-accent: #F97316;
  --c-success: #10B981;
  --c-bg: #F8FAFC;
  --c-white: #FFFFFF;
  --c-border: #E2E8F0;
  --c-muted: #64748B;
  --c-text-light: #94A3B8;
}

.dark {
  --c-primary: #3B82F6;
  --c-secondary: #F8FAFC;
  --c-accent: #FB923C;
  --c-success: #34D399;
  --c-bg: #0F172A;
  --c-white: #1E293B;
  --c-border: #334155;
  --c-muted: #94A3B8;
  --c-text-light: #64748B;
}

@keyframes radar-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.radar-sweep {
  animation: radar-spin 3s linear infinite;
}`;

const CATEGORIES = [
  { key: "all", label: "Tümü", icon: LayoutGrid, color: COLORS.secondary, tint: "rgba(148,163,184,0.16)" },
  { key: "Garson", label: "Garson", icon: UtensilsCrossed, color: COLORS.primary, tint: "rgba(37,99,235,0.12)" },
  { key: "Kurye", label: "Kurye", icon: Bike, color: COLORS.accent, tint: "rgba(249,115,22,0.12)" },
  { key: "Kasiyer", label: "Kasiyer", icon: Receipt, color: COLORS.success, tint: "rgba(16,185,129,0.12)" },
  { key: "Temizlik", label: "Temizlik", icon: Sparkles, color: COLORS.primary, tint: "rgba(37,99,235,0.12)" },
  { key: "Depo", label: "Depo", icon: Package, color: COLORS.accent, tint: "rgba(249,115,22,0.12)" },
  { key: "İnşaat", label: "İnşaat", icon: HardHat, color: COLORS.success, tint: "rgba(16,185,129,0.12)" },
  { key: "Güvenlik", label: "Güvenlik", icon: Shield, color: COLORS.secondary, tint: "rgba(148,163,184,0.16)" },
  { key: "Etkinlik", label: "Etkinlik", icon: Users, color: COLORS.primary, tint: "rgba(37,99,235,0.12)" },
  { key: "Teknoloji", label: "Teknoloji", icon: Laptop, color: COLORS.accent, tint: "rgba(249,115,22,0.12)" },
];

// 20 Detaylı Rozet Listesi
const ALL_BADGES = [
  { id: 1, title: "Hızlı Yanıt Veren", icon: Zap, gradient: "linear-gradient(135deg, #93C5FD, #2563EB)", desc: "Son 10 mesajlaşmada ortalama 10 dakika içinde dönüş yaparak açılır.", unlocked: true },
  { id: 2, title: "Süper Çalışan", icon: Star, gradient: "linear-gradient(135deg, #FCD34D, #F97316)", desc: "Tamamlanan işlerde 4.8+ ortalama puan tutturunca açılır.", unlocked: true },
  { id: 3, title: "Dakik Personel", icon: Clock, gradient: "linear-gradient(135deg, #6EE7B7, #10B981)", desc: "İşe başlama saatlerine %100 zamanında uyarak 5 görev tamamlama ile açılır.", unlocked: true },
  { id: 4, title: "Seri İşçi", icon: Flame, gradient: "linear-gradient(135deg, #F87171, #DC2626)", desc: "Arka arkaya 3 gün boyunca farklı görevlerde çalışarak açılır.", unlocked: false },
  { id: 5, title: "Esnek Güç", icon: Compass, gradient: "linear-gradient(135deg, #A78BFA, #7C3AED)", desc: "Hem gece vardiyası hem gündüz işlerinde başarıyla görev alarak açılır.", unlocked: false },
  { id: 6, title: "Güvenilir Profil", icon: Shield, gradient: "linear-gradient(135deg, #34D399, #059669)", desc: "Kimlik doğrulama adımını başarıyla tamamlayınca otomatik açılır.", unlocked: true },
  { id: 7, title: "Onaylı Esnaf Dostu", icon: Users, gradient: "linear-gradient(135deg, #60A5FA, #1D4ED8)", desc: "5 farklı işverenden olumlu referans alınca açılır.", unlocked: false },
  { id: 8, title: "Kıdemli Üye", icon: Award, gradient: "linear-gradient(135deg, #F472B6, #DB2777)", desc: "Platformda 6 ayını dolduran kullanıcılara verilir.", unlocked: false },
  { id: 9, title: "Kusursuz Sicil", icon: ShieldCheck, gradient: "linear-gradient(135deg, #38BDF8, #0284C7)", desc: "Hiçbir iş iptali veya cezası almadan 10 görev tamamlama ile açılır.", unlocked: false },
  { id: 10, title: "İletişim Uzmanı", icon: Smile, gradient: "linear-gradient(135deg, #FBBF24, #D97706)", desc: "İşverenlerle olan mesajlaşma başarısı ve nezaket puanı ile açılır.", unlocked: true },
  { id: 11, title: "Garsonlar Kralı", icon: Coffee, gradient: "linear-gradient(135deg, #FB7185, #E11D48)", desc: "Yeme-içme sektöründe 5+ başarılı hizmet verince açılır.", unlocked: false },
  { id: 12, title: "Hızlı Kurye", icon: Truck, gradient: "linear-gradient(135deg, #4ADE80, #16A34A)", desc: "Kurye ve lojistik kategorisinde 10 teslimat tamamlayınca açılır.", unlocked: false },
  { id: 13, title: "Temizlik Gurusu", icon: Sparkles, gradient: "linear-gradient(135deg, #818CF8, #4F46E5)", desc: "Temizlik görevlerinde tam puan alarak açılır.", unlocked: false },
  { id: 14, title: "Depo Canavarı", icon: Package, gradient: "linear-gradient(135deg, #FB923C, #C2410C)", desc: "Fiziksel güç ve lojistik/depo işlerinde 5 kez görev alınca açılır.", unlocked: false },
  { id: 15, title: "Etkinlik Akıncısı", icon: Users, gradient: "linear-gradient(135deg, #C084FC, #9333EA)", desc: "Konser, fuar ve organizasyon görevlerinde tam yetkinlik kazanınca açılır.", unlocked: false },
  { id: 16, title: "İlk Adım", icon: Sparkle, gradient: "linear-gradient(135deg, #38BDF8, #2563EB)", desc: "Platformdaki ilk görevini başarıyla tamamlayan herkese verilir.", unlocked: true },
  { id: 17, title: "Yevmiye Canavarı", icon: Wallet, gradient: "linear-gradient(135deg, #48BB78, #22543D)", desc: "Tek bir haftada toplam 5.000 ₺ kazanca ulaşınca açılır.", unlocked: false },
  { id: 18, title: "Günün Kurtarıcısı", icon: FlameKindling, gradient: "linear-gradient(135deg, #ED8936, #9C4221)", desc: "Acil/anlık açılan 'Hemen Lazım' işlerine gidip görevi tamamlayınca açılır.", unlocked: false },
  { id: 19, title: "5 Yıldızlı Yıldız", icon: Star, gradient: "linear-gradient(135deg, #ECC94B, #B7791F)", desc: "Toplamda 20 adet 5 yıldızlı değerlendirme alınca açılır.", unlocked: false },
  { id: 20, title: "İşin Hazır Efsanesi", icon: Crown, gradient: "linear-gradient(135deg, #9F7AEA, #553C9A)", desc: "Platformda 50 toplam görevi geride bırakan elite çalışanlara verilir.", unlocked: false },
];

const DIFFICULTY_STYLES: Record<string, { bg: string; color: string }> = {
  "Kolay": { bg: "rgba(16,185,129,0.15)", color: COLORS.success },
  "Orta": { bg: "rgba(249,115,22,0.15)", color: COLORS.accent },
  "Zor / Fiziksel Güç Gerektirir": { bg: "rgba(239,68,68,0.15)", color: "#EF4444" },
};

function DifficultyBadge({ level }: { level: string }) {
  const s = DIFFICULTY_STYLES[level] || DIFFICULTY_STYLES["Orta"];
  return (
    <span
      className="px-2 py-1 rounded-full flex-shrink-0"
      style={{ background: s.bg, color: s.color, fontFamily: "Poppins", fontWeight: 600, fontSize: 10 }}
    >
      {level}
    </span>
  );
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const USERS_STORAGE_KEY = "isimhazir_users";
const SESSION_STORAGE_KEY = "isimhazir_session";
const THEME_STORAGE_KEY = "isimhazir_theme";

function loadUsers(): any[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: any[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function seedDefaultUser(): any[] {
  const users = loadUsers();
  if (users.length > 0) return users;
  const seeded = [
    {
      name: "Ömer Seçkin",
      email: "omersckn7@gmail.com",
      password: "omer123",
      phone: "0532 123 45 67",
      avatar: null as string | null,
      bio: "İnternet ve Ağ Teknolojileri eğitimi aldım; yazılım ve teknoloji dünyasına ilgi duyuyorum. Bunun yanında saha ve hizmet sektöründe esnek çalışma saatlerine uygun, hızlı adapte olabilen, güler yüzlü bir ekip arkadaşıyım.",
      skills: ["Bilgisayar Ağları", "Teknik Destek", "Müşteri İlişkileri", "Hızlı Öğrenme", "Saha Hizmetleri", "Ekip Çalışması"],
    },
  ];
  saveUsers(seeded);
  return seeded;
}

function updateUserRecord(email: string, patch: any) {
  const users = loadUsers();
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...patch };
    saveUsers(users);
  }
}

function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_STORAGE_KEY);
}

function persistSession(email: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_STORAGE_KEY, email.toLowerCase());
}

function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function Avatar({
  name,
  photo,
  size = 96,
  fontSize = 32,
  onPick,
}: {
  name: string;
  photo?: string | null;
  size?: number;
  fontSize?: number;
  onPick?: (file: File) => void;
}) {
  const inputId = React.useId();
  const circle = (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
      style={{ width: size, height: size, background: photo ? "transparent" : "linear-gradient(135deg,#2563EB,#0F172A)" }}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo || "/placeholder.svg"} alt={`${name} profil fotoğrafı`} className="w-full h-full object-cover" />
      ) : (
        <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize, color: "#FFFFFF" }}>{getInitials(name)}</span>
      )}
    </div>
  );

  if (!onPick) return circle;

  return (
    <label htmlFor={inputId} className="relative inline-block cursor-pointer" title="Fotoğrafı Değiştir">
      {circle}
      <span
        className="absolute rounded-full flex items-center justify-center"
        style={{ width: 28, height: 28, right: -2, bottom: -2, background: COLORS.primary, border: `2px solid ${COLORS.white}` }}
      >
        <Camera size={13} color="#FFFFFF" />
      </span>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file);
          e.target.value = "";
        }}
      />
    </label>
  );
}

function StatusBar({ dark }: { dark?: boolean }) {
  return (
    <div
      className="flex items-center justify-between px-6 pt-3 pb-1 text-[13px] font-semibold"
      style={{ color: dark ? "#FFFFFF" : COLORS.secondary, fontFamily: "Poppins" }}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span>●●●</span>
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );
}

function BottomNav({ active, onNavigate }: { active: string; onNavigate: (key: string) => void }) {
  const items = [
    { key: "home", label: "Ana Sayfa", icon: Home },
    { key: "jobs", label: "İşler", icon: Briefcase },
    { key: "chat", label: "Mesajlar", icon: MessageCircle },
    { key: "alerts", label: "Bildirimler", icon: Bell },
    { key: "profile", label: "Profil", icon: User },
  ];
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex justify-between px-3 py-2 border-t"
      style={{ background: COLORS.white, borderColor: COLORS.border, zIndex: 40 }}
    >
      {items.map((it) => {
        const isActive = active === it.key;
        const Icon = it.icon;
        return (
          <button
            key={it.key}
            onClick={() => onNavigate(it.key)}
            className="flex flex-col items-center gap-0.5 flex-1 cursor-pointer"
            style={{ color: isActive ? COLORS.primary : COLORS.textLight }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
            <span style={{ fontFamily: "Poppins", fontSize: 10, fontWeight: isActive ? 600 : 500 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SplashScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: "#0F172A" }}>
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5" style={{ background: COLORS.primary }}>
        <span style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: 34, color: "#FFFFFF" }}>i</span>
      </div>
      <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 26, color: "#FFFFFF" }}>
        İŞİM<span style={{ color: COLORS.accent }}>Hazır</span>
      </div>
      <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>
        İşini Kolay Bul, Doğru Çalışanla Büyü
      </div>
      <div className="mt-10 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: COLORS.primary, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function OnboardingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.white }}>
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-44 h-44 rounded-3xl flex items-center justify-center mb-8" style={{ background: "rgba(37,99,235,0.1)" }}>
          <Briefcase size={64} color={COLORS.primary} strokeWidth={1.5} />
        </div>
        <div className="text-center" style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 21, color: COLORS.secondary, lineHeight: 1.4 }}>
          İş Bulmak Hiç Bu Kadar Kolay Olmamıştı
        </div>
        <div className="text-center mt-3" style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>
          Binlerce iş fırsatına kolayca ulaşın, hemen başvurun.
        </div>
      </div>
      <div className="px-6 pb-8">
        <div className="flex justify-center gap-1.5 mb-6">
          <span className="w-6 h-1.5 rounded-full" style={{ background: COLORS.primary }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.border }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.border }} />
        </div>
        <button
          onClick={onStart}
          className="w-full py-3.5 rounded-xl cursor-pointer"
          style={{ background: COLORS.primary, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 15 }}
        >
          Başla
        </button>
      </div>
    </div>
  );
}

function UserTypeScreen({ onPickWorker }: { onPickWorker: () => void }) {
  const [selected, setSelected] = useState("worker");
  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.white }}>
      <StatusBar />
      <div className="px-6 pt-4">
        <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 20, color: COLORS.secondary }}>Kullanıcı Tipi Seçimi</div>
        <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 13, color: COLORS.muted, marginTop: 4 }}>Devam etmek için bir seçenek belirleyin</div>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-4 px-6">
        <button
          onClick={() => setSelected("worker")}
          className="rounded-2xl p-5 flex flex-col items-center gap-3 border-2 transition cursor-pointer"
          style={{ background: selected === "worker" ? "rgba(37,99,235,0.06)" : COLORS.bg, borderColor: selected === "worker" ? COLORS.primary : COLORS.border }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: COLORS.primary }}>
            <User size={26} color="#FFFFFF" />
          </div>
          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 15, color: COLORS.secondary }}>İşçiyim</div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted }}>İş bulmak istiyorum</div>
        </button>

        <button
          onClick={() => setSelected("employer")}
          className="rounded-2xl p-5 flex flex-col items-center gap-3 border-2 transition cursor-pointer"
          style={{ background: selected === "employer" ? "rgba(249,115,22,0.06)" : COLORS.bg, borderColor: selected === "employer" ? COLORS.accent : COLORS.border }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: COLORS.accent }}>
            <Briefcase size={26} color="#FFFFFF" />
          </div>
          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 15, color: COLORS.secondary }}>İşverenim</div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted }}>Çalışan arıyorum</div>
        </button>
      </div>
      <div className="px-6 pb-8">
        <button
          onClick={onPickWorker}
          disabled={selected !== "worker"}
          className="w-full py-3.5 rounded-xl cursor-pointer"
          style={{ background: selected === "worker" ? COLORS.primary : COLORS.border, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 15 }}
        >
          Devam Et
        </button>
        <div className="text-center mt-2" style={{ fontFamily: "Poppins", fontSize: 11, color: COLORS.textLight }}>
          {selected === "employer" ? "İşveren akışı bu prototipte kapsam dışıdır." : "\u00A0"}
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: (record: any) => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (next: "login" | "signup") => {
    setMode(next);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = () => {
    setError("");
    const trimmedEmail = email.trim().toLowerCase();

    if (mode === "login") {
      if (!trimmedEmail || !password) {
        setError("Lütfen e-posta ve şifrenizi girin.");
        return;
      }
      const users = loadUsers();
      const found = users.find((u: any) => u.email.toLowerCase() === trimmedEmail);
      if (!found || found.password !== password) {
        setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
        return;
      }
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        onLogin(found);
      }, 350);
      return;
    }

    if (!name.trim() || !trimmedEmail || !password || !confirmPassword) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Girdiğiniz şifreler eşleşmiyor.");
      return;
    }
    const users = loadUsers();
    if (users.some((u: any) => u.email.toLowerCase() === trimmedEmail)) {
      setError("Bu e-posta adresiyle zaten bir hesap mevcut.");
      return;
    }
    const record = {
      name: name.trim(),
      email: trimmedEmail,
      phone: phone.trim(),
      password,
      avatar: null as string | null,
      bio: "",
      skills: [] as string[],
    };
    saveUsers([...users, record]);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onLogin(record);
    }, 350);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) handleSubmit();
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.white }}>
      <StatusBar />
      <div className="px-6 pt-5">
        <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 22, color: COLORS.secondary }}>Hoş Geldiniz!</div>
        <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 13, color: COLORS.muted, marginTop: 4 }}>
          Hesabınıza giriş yapın veya yeni hesap oluşturun.
        </div>
      </div>

      <div className="px-6 mt-5">
        <div className="flex rounded-xl p-1 border" style={{ background: COLORS.bg, borderColor: COLORS.border }}>
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className="flex-1 py-2.5 rounded-lg cursor-pointer transition"
              style={{
                background: mode === m ? COLORS.white : "transparent",
                boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.10)" : "none",
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: 13,
                color: mode === m ? COLORS.primary : COLORS.textLight,
              }}
            >
              {m === "login" ? "Giriş Yap" : "Kayıt Ol"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-5 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-3">
          {mode === "signup" && (
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 border" style={{ background: COLORS.bg, borderColor: COLORS.border }}>
              <User size={16} color={COLORS.textLight} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Ad Soyad"
                className="flex-1 bg-transparent outline-none w-full"
                style={{ fontFamily: "Poppins", fontSize: 13, color: COLORS.secondary }}
              />
            </div>
          )}

          <div className="flex items-center gap-2 rounded-xl px-4 py-3 border" style={{ background: COLORS.bg, borderColor: COLORS.border }}>
            <Mail size={16} color={COLORS.textLight} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="E-Posta Adresi"
              type="email"
              autoCapitalize="none"
              className="flex-1 bg-transparent outline-none w-full"
              style={{ fontFamily: "Poppins", fontSize: 13, color: COLORS.secondary }}
            />
          </div>

          {mode === "signup" && (
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 border" style={{ background: COLORS.bg, borderColor: COLORS.border }}>
              <Phone size={16} color={COLORS.textLight} />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Telefon Numarası (opsiyonel)"
                className="flex-1 bg-transparent outline-none w-full"
                style={{ fontFamily: "Poppins", fontSize: 13, color: COLORS.secondary }}
              />
            </div>
          )}

          <div className="flex items-center gap-2 rounded-xl px-4 py-3 border" style={{ background: COLORS.bg, borderColor: COLORS.border }}>
            <Lock size={16} color={COLORS.textLight} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Şifre"
              type="password"
              className="flex-1 bg-transparent outline-none w-full"
              style={{ fontFamily: "Poppins", fontSize: 13, color: COLORS.secondary }}
            />
          </div>

          {mode === "signup" && (
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 border" style={{ background: COLORS.bg, borderColor: COLORS.border }}>
              <Lock size={16} color={COLORS.textLight} />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Şifre Tekrar"
                type="password"
                className="flex-1 bg-transparent outline-none w-full"
                style={{ fontFamily: "Poppins", fontSize: 13, color: COLORS.secondary }}
              />
            </div>
          )}

          {mode === "login" && (
            <div className="text-right" style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.primary, fontWeight: 500 }}>
              Şifremi Unuttum?
            </div>
          )}

          {error && (
            <div className="rounded-xl px-4 py-3 flex items-center gap-2" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid #FECACA" }}>
              <X size={14} color="#EF4444" strokeWidth={2.5} />
              <span style={{ fontFamily: "Poppins", fontSize: 12, color: "#EF4444", fontWeight: 500, lineHeight: 1.4 }}>{error}</span>
            </div>
          )}

          {mode === "login" && !error && (
            <div className="rounded-xl px-4 py-3" style={{ background: "rgba(37,99,235,0.1)" }}>
              <span style={{ fontFamily: "Poppins", fontSize: 11, color: COLORS.primary, fontWeight: 500, lineHeight: 1.5 }}>
                Test hesabı: omersckn7@gmail.com / omer123
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-8 pt-3">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3.5 rounded-xl cursor-pointer"
          style={{ background: COLORS.primary, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 15, opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? "Lütfen bekleyin..." : mode === "login" ? "Giriş Yap" : "Hesap Oluştur"}
        </button>
      </div>
    </div>
  );
}

const JOB_LISTINGS = [
  {
    id: 1,
    title: "Garson",
    company: "İstanbul Catering",
    location: "Beşiktaş, İstanbul",
    pay: "850 ₺ / Günlük",
    rating: 4.8,
    reviews: 128,
    category: "Garson",
    workType: "Yarı Zamanlı",
    distanceKm: 3,
    hours: "18:00 - 23:00",
    date: "25 Mayıs 2024, Cumartesi",
    difficulty: "Orta",
    description: "Düğün organizasyonunda garson olarak çalışacak, servis düzeni ve misafir karşılama işlerinde destek olacak ekip arkadaşı arıyoruz.",
  },
  {
    id: 2,
    title: "Motorlu Kurye",
    company: "Marmara Lojistik",
    location: "Kadıköy, İstanbul",
    pay: "700 ₺ / Günlük",
    rating: 4.6,
    reviews: 94,
    category: "Kurye",
    workType: "Tam Zamanlı",
    distanceKm: 7,
    hours: "09:00 - 18:00",
    date: "27 Mayıs 2024, Pazartesi",
    difficulty: "Orta",
    description: "Kadıköy ve çevresinde günlük paket teslimatı yapacak motoru olan, ehliyet sahibi kurye arkadaşı arıyoruz. Benzin masrafı şirket tarafından karşılanır.",
  },
  {
    id: 3,
    title: "Temizlik Görevlisi",
    company: "Ege Temizlik",
    location: "Konak, İzmir",
    pay: "600 ₺ / Günlük",
    rating: 4.5,
    reviews: 61,
    category: "Temizlik",
    workType: "Yarı Zamanlı",
    distanceKm: 15,
    hours: "08:00 - 14:00",
    date: "26 Mayıs 2024, Pazar",
    difficulty: "Kolay",
    description: "Ofis katlarının genel temizliği için deneyimli, düzenli çalışan bir temizlik görevlisi arıyoruz. Malzemeler tarafımızca sağlanmaktadır.",
  },
  {
    id: 4,
    title: "Kasiyer",
    company: "Merkez Market",
    location: "Çankaya, Ankara",
    pay: "750 ₺ / Günlük",
    rating: 4.7,
    reviews: 112,
    category: "Kasiyer",
    workType: "Tam Zamanlı",
    distanceKm: 4,
    hours: "10:00 - 19:00",
    date: "28 Mayıs 2024, Salı",
    difficulty: "Kolay",
    description: "Market kasasında ürün okutma, tahsilat ve müşteri karşılama görevlerini yürütecek güler yüzlü bir kasiyer arıyoruz. Deneyim şart değildir.",
  },
  {
    id: 5,
    title: "Depo Yükleme ve Lojistik Elemanı",
    company: "Anadolu Depo Merkezi",
    location: "Tuzla, İstanbul",
    pay: "1.400 ₺ / Günlük",
    rating: 4.4,
    reviews: 73,
    category: "Depo",
    workType: "Tam Zamanlı",
    distanceKm: 18,
    hours: "07:00 - 16:00",
    date: "29 Mayıs 2024, Çarşamba",
    difficulty: "Zor / Fiziksel Güç Gerektirir",
    description: "Depoda palet yükleme/boşaltma, koli taşıma ve sevkiyat hazırlığı yapacak fiziksel olarak güçlü ekip arkadaşları arıyoruz. Forklift deneyimi avantajdır.",
  },
  {
    id: 6,
    title: "İnşaat Sonrası Temizlik Uzmanı",
    company: "Bursa Organizasyon",
    location: "Nilüfer, Bursa",
    pay: "1.100 ₺ / Günlük",
    rating: 4.3,
    reviews: 42,
    category: "İnşaat",
    workType: "Yarı Zamanlı",
    distanceKm: 12,
    hours: "08:00 - 17:00",
    date: "30 Mayıs 2024, Perşembe",
    difficulty: "Zor / Fiziksel Güç Gerektirir",
    description: "Yeni teslim edilen konut projesinde ince inşaat sonrası moloz temizliği, cam ve yüzey temizliği yapacak dayanıklı bir ekip arıyoruz.",
  },
  {
    id: 7,
    title: "Konser Alanı Güvenlik / Yönlendirme",
    company: "Marmara Etkinlik A.Ş.",
    location: "Maslak, İstanbul",
    pay: "1.000 ₺ / Günlük",
    rating: 4.6,
    reviews: 88,
    category: "Güvenlik",
    workType: "Yarı Zamanlı",
    distanceKm: 9,
    hours: "16:00 - 00:00",
    date: "31 Mayıs 2024, Cuma",
    difficulty: "Orta",
    description: "Konser alanında giriş kontrolü, kalabalık yönlendirme ve genel güvenlik desteği sağlayacak, dış mekanda ayakta çalışabilecek personel arıyoruz.",
  },
  {
    id: 8,
    title: "Fuar Hostu / İngilizce Bilen Karşılama",
    company: "İstanbul Fuar Merkezi",
    location: "Yeşilköy, İstanbul",
    pay: "1.250 ₺ / Günlük",
    rating: 4.9,
    reviews: 65,
    category: "Etkinlik",
    workType: "Yarı Zamanlı",
    distanceKm: 21,
    hours: "09:00 - 19:00",
    date: "1 Haziran 2024, Cumartesi",
    difficulty: "Kolay",
    description: "Uluslararası fuarda yabancı ve yerli ziyaretçileri karşılayacak, temsil yeteneği yüksek, akıcı İngilizce konuşabilen hostes/host arıyoruz.",
  },
  {
    id: 9,
    title: "Mobil Uygulama Test Uzmanı",
    company: "Kodçu Yazılım",
    location: "Levent, İstanbul",
    pay: "1.300 ₺ / Günlük",
    rating: 4.7,
    reviews: 37,
    category: "Teknoloji",
    workType: "Tam Zamanlı",
    distanceKm: 6,
    hours: "10:00 - 18:00",
    date: "2 Haziran 2024, Pazar",
    difficulty: "Orta",
    description: "Geliştirilmekte olan mobil uygulamalarda manuel test senaryoları koşacak, hata (bug) raporları hazırlayacak, teknolojiye meraklı bir test uzmanı arıyoruz.",
  },
  {
    id: 10,
    title: "Gece Vardiyası Depo Sorumlusu",
    company: "Anadolu Depo Merkezi",
    location: "Tuzla, İstanbul",
    pay: "1.500 ₺ / Günlük",
    rating: 4.5,
    reviews: 29,
    category: "Depo",
    workType: "Tam Zamanlı",
    distanceKm: 18,
    hours: "22:00 - 06:00",
    date: "3 Haziran 2024, Pazartesi",
    difficulty: "Zor / Fiziksel Güç Gerektirir",
    description: "Gece vardiyasında depo giriş-çıkış takibi, envanter kontrolü ve ekip koordinasyonu yapacak, gece çalışmaya uygun sorumlu bir personel arıyoruz.",
  },
];

const parsePay = (payStr: string) => parseInt(payStr.replace(/\./g, ""), 10) || 0;
const WORK_TYPES = ["Tam Zamanlı", "Yarı Zamanlı"];
const DISTANCE_OPTIONS = [5, 10, 20];
const AVG_MARKET_PAY = 900;

const TOP_WORKERS = [
  { id: 1, name: "Ali K.", rating: 4.9, jobs: 42, color: "#FCD34D", icon: Crown },
  { id: 2, name: "Ayşe Y.", rating: 4.8, jobs: 38, color: "#E2E8F0", icon: Award },
  { id: 3, name: "Mehmet D.", rating: 4.8, jobs: 31, color: "#FDBA74", icon: Award },
  { id: 4, name: "Zeynep S.", rating: 4.7, jobs: 25, color: "transparent", icon: Star },
];

function JobCard({
  job,
  isFavorite,
  onToggleFavorite,
  onOpen,
  onQuickApply,
}: {
  job: any;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpen: () => void;
  onQuickApply?: (job: any) => void;
}) {
  const matchScore = 80 + (job.id % 18);

  return (
    <div className="relative w-full rounded-2xl p-4 mb-3 border" style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <button
        onClick={() => onToggleFavorite(job.id)}
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
        style={{ background: COLORS.bg, zIndex: 2 }}
      >
        <Heart size={15} color={isFavorite ? "#EF4444" : COLORS.textLight} fill={isFavorite ? "#EF4444" : "none"} strokeWidth={2} />
      </button>

      <button onClick={onOpen} className="w-full flex flex-col gap-2 text-left cursor-pointer">
        <div className="flex items-start justify-between pr-9">
          <div>
            <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 15, color: COLORS.secondary }}>{job.title}</div>
            <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted }}>{job.company}</div>
          </div>
          <div className="flex items-center gap-1">
            <Star size={13} color={COLORS.accent} fill={COLORS.accent} />
            <span style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.secondary, fontWeight: 600 }}>{job.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {job.difficulty && <DifficultyBadge level={job.difficulty} />}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)" }}>
            <Zap size={10} color={COLORS.success} fill={COLORS.success} />
            <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 10, color: COLORS.success }}>%{matchScore} Uyumlu</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1" style={{ color: COLORS.muted }}>
            <MapPin size={12} />
            <span style={{ fontFamily: "Poppins", fontSize: 11 }}>{job.location}</span>
          </div>
          <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 14, color: COLORS.primary }}>{job.pay}</span>
        </div>
      </button>

      <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        {onQuickApply ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickApply(job);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg cursor-pointer"
            style={{ background: "rgba(249,115,22,0.12)" }}
          >
            <Zap size={12} color={COLORS.accent} fill={COLORS.accent} />
            <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 11, color: COLORS.accent }}>Hızlı Başvur</span>
          </button>
        ) : (
          <span />
        )}
        <button onClick={onOpen} className="flex items-center cursor-pointer" style={{ color: COLORS.primary }}>
          <span style={{ fontFamily: "Poppins", fontSize: 11, fontWeight: 500 }}>Detayları Gör</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

const PIN_POSITIONS = [
  { left: "24%", top: "30%" },
  { left: "64%", top: "20%" },
  { left: "42%", top: "64%" },
  { left: "78%", top: "56%" },
];

function MapView({ jobs, onOpenJob }: { jobs: any[]; onOpenJob: (job: any) => void }) {
  const pins = jobs.slice(0, 4);
  return (
    <div className="rounded-2xl relative overflow-hidden border" style={{ height: 340, background: COLORS.bg, borderColor: COLORS.border }}>
      <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 320 340" preserveAspectRatio="none">
        <rect width="320" height="340" fill="transparent" />
        <circle cx="270" cy="60" r="42" fill="rgba(16,185,129,0.12)" />
        <circle cx="45" cy="270" r="55" fill="rgba(16,185,129,0.12)" />
        <path d="M-10,110 Q100,90 180,120 T340,95" stroke={COLORS.border} strokeWidth="9" fill="none" />
        <path d="M-10,230 Q120,255 220,220 T340,240" stroke={COLORS.border} strokeWidth="7" fill="none" />
        <path d="M95,-10 L60,350" stroke={COLORS.border} strokeWidth="6" fill="none" />
      </svg>

      <div className="absolute" style={{ left: "50%", top: "46%", transform: "translate(-50%,-50%)" }}>
        <span className="block rounded-full" style={{ width: 14, height: 14, background: COLORS.primary, border: `3px solid ${COLORS.white}`, boxShadow: "0 0 0 6px rgba(37,99,235,0.22)" }} />
      </div>

      {pins.map((job, i) => (
        <button
          key={job.id}
          onClick={() => onOpenJob(job)}
          className="absolute flex flex-col items-center cursor-pointer"
          style={{ left: PIN_POSITIONS[i].left, top: PIN_POSITIONS[i].top, transform: "translate(-50%, -100%)" }}
        >
          <div className="px-2.5 py-1.5 rounded-full" style={{ background: COLORS.secondary, boxShadow: "0 6px 14px rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 11, color: "#FFFFFF" }}>{job.pay.split(" ")[0]}₺</span>
          </div>
          <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `7px solid ${COLORS.secondary}`, marginTop: -1 }} />
        </button>
      ))}

      {pins.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.muted, background: COLORS.white, padding: "6px 12px", borderRadius: 999 }}>
            Bu bölgede ilan bulunamadı
          </span>
        </div>
      )}
    </div>
  );
}

const RADAR_PIN_POSITIONS = [
  { top: "25%", left: "30%" },
  { top: "70%", left: "65%" },
  { top: "40%", left: "78%" },
  { top: "80%", left: "35%" },
  { top: "15%", left: "60%" },
];

function RadarView({ jobs, onOpenJob }: { jobs: any[]; onOpenJob: (job: any) => void }) {
  const pins = jobs.slice(0, 5);
  return (
    <div className="rounded-2xl relative overflow-hidden flex items-center justify-center border" style={{ height: 340, background: "#064E3B", borderColor: COLORS.border }}>
      <div
        className="absolute inset-0 radar-sweep"
        style={{ background: "conic-gradient(from 0deg, transparent 70%, rgba(16,185,129,0.55) 100%)", borderRadius: "50%" }}
      />
      <div className="absolute w-64 h-64 rounded-full" style={{ border: "1px solid rgba(16,185,129,0.2)" }} />
      <div className="absolute w-40 h-40 rounded-full" style={{ border: "1px solid rgba(16,185,129,0.3)" }} />
      <div className="absolute w-16 h-16 rounded-full" style={{ border: "1px solid rgba(16,185,129,0.5)" }} />
      <MapPin size={24} color="#10B981" fill="#10B981" className="absolute z-10" />

      {pins.map((job, i) => (
        <button
          key={job.id}
          onClick={() => onOpenJob(job)}
          className="absolute flex items-center justify-center cursor-pointer"
          style={{ top: RADAR_PIN_POSITIONS[i % 5].top, left: RADAR_PIN_POSITIONS[i % 5].left }}
          title={job.title}
        >
          <span className="w-3 h-3 rounded-full absolute animate-ping" style={{ background: "#4ADE80" }} />
          <span className="w-3 h-3 rounded-full relative" style={{ background: "#10B981", boxShadow: "0 0 10px #34D399" }} />
        </button>
      ))}

      {pins.length === 0 && (
        <span style={{ position: "absolute", fontFamily: "Poppins", fontSize: 12, color: "#A7F3D0" }}>Bu bölgede ilan bulunamadı</span>
      )}

      <div className="absolute bottom-4 px-4 py-2 rounded-full flex items-center gap-2" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
        <Radar size={14} color="#34D399" className="animate-pulse" />
        <span style={{ fontFamily: "Poppins", fontSize: 11, fontWeight: 500, color: "#34D399" }}>Yakındaki işler taranıyor...</span>
      </div>
    </div>
  );
}

function FilterModal({ minPay, setMinPay, workTypes, toggleWorkType, maxDistance, setMaxDistance, onReset, onClose, resultCount }: any) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.55)", zIndex: 50 }} onClick={onClose}>
      <div
        className="rounded-t-3xl px-5 pt-3 pb-8 border-t"
        style={{ background: COLORS.white, borderColor: COLORS.border, maxHeight: "80%", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1.5 rounded-full mx-auto mb-4" style={{ background: COLORS.border }} />
        <div className="flex items-center justify-between mb-5">
          <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 16, color: COLORS.secondary }}>Filtrele</span>
          <button onClick={onReset} className="cursor-pointer" style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.primary }}>
            Temizle
          </button>
        </div>

        <div className="mb-6">
          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary, marginBottom: 10 }}>Maaş Aralığı</div>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.muted }}>Min. Günlük Ücret</span>
            <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 13, color: COLORS.primary }}>{minPay} ₺</span>
          </div>
          <input
            type="range"
            min={0}
            max={1600}
            step={50}
            value={minPay}
            onChange={(e) => setMinPay(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: COLORS.primary }}
          />
        </div>

        <div className="mb-6">
          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary, marginBottom: 10 }}>Çalışma Tipi</div>
          <div className="flex gap-2">
            {WORK_TYPES.map((wt) => {
              const active = workTypes.includes(wt);
              return (
                <button
                  key={wt}
                  onClick={() => toggleWorkType(wt)}
                  className="px-4 py-2 rounded-full cursor-pointer"
                  style={{ background: active ? COLORS.primary : "rgba(37,99,235,0.08)", color: active ? "#FFFFFF" : COLORS.primary, fontFamily: "Poppins", fontWeight: 600, fontSize: 12 }}
                >
                  {wt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-2">
          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary, marginBottom: 10 }}>Konum Mesafesi</div>
          <div className="flex gap-2">
            {DISTANCE_OPTIONS.map((km) => {
              const active = maxDistance === km;
              return (
                <button
                  key={km}
                  onClick={() => setMaxDistance(active ? null : km)}
                  className="px-4 py-2 rounded-full cursor-pointer"
                  style={{ background: active ? COLORS.primary : "rgba(37,99,235,0.08)", color: active ? "#FFFFFF" : COLORS.primary, fontFamily: "Poppins", fontWeight: 600, fontSize: 12 }}
                >
                  {km} km
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl mt-6 cursor-pointer"
          style={{ background: COLORS.primary, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 15 }}
        >
          Sonuçları Göster ({resultCount})
        </button>
      </div>
    </div>
  );
}

function WalletModal({ onClose, showToast }: { onClose: () => void; showToast: (msg: string, icon?: React.ReactNode) => void }) {
  const earnings = [
    { id: 1, title: "Garsonluk", company: "İstanbul Catering", amount: "+850 ₺", date: "Dün" },
    { id: 2, title: "Motorlu Kurye", company: "Marmara Lojistik", amount: "+700 ₺", date: "20 Mayıs" },
    { id: 3, title: "Temizlik Görevlisi", company: "Ege Temizlik", amount: "+600 ₺", date: "15 Mayıs" },
    { id: 4, title: "Kasiyer", company: "Merkez Market", amount: "+750 ₺", date: "9 Mayıs" },
  ];

  const [balance, setBalance] = useState(2900);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleWithdraw = () => {
    if (balance === 0) return;
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setBalance(0);
      setIsSuccess(true);
      showToast("Para başarıyla banka hesabınıza aktarıldı.", <CheckCircle2 size={14} color="#FFFFFF" />);
      
      // Mesajı bir süre sonra sıfırlayabilirsiniz
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ background: "rgba(0,0,0,0.6)", zIndex: 60 }}
      onClick={onClose}
    >
      <div
        className="w-full rounded-2xl p-5 border"
        style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: "0 20px 40px rgba(0,0,0,0.3)", maxHeight: "80%", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.15)" }}>
              <Wallet size={18} color={COLORS.success} />
            </div>
            <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 16, color: COLORS.secondary }}>Cüzdan &amp; Kazançlar</span>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: COLORS.bg }}>
            <X size={14} color={COLORS.secondary} />
          </button>
        </div>

        <div className="p-4 rounded-2xl mb-4 relative" style={{ background: "linear-gradient(135deg, #2563EB, #1E40AF)", color: "#FFFFFF" }}>
          <div style={{ fontFamily: "Poppins", fontSize: 12, opacity: 0.85 }}>Toplam Net Kazanç</div>
          <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 24, marginTop: 4 }}>
            {balance.toLocaleString("tr-TR")} ₺
          </div>
          <div style={{ fontFamily: "Poppins", fontSize: 10, opacity: 0.75, marginTop: 2 }}>Bu ay 4 farklı görev tamamlandı</div>

          <button
            onClick={handleWithdraw}
            disabled={isWithdrawing || balance === 0 || isSuccess}
            className="w-full mt-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            style={{
              background: isSuccess ? COLORS.success : "rgba(255,255,255,0.2)",
              color: "#FFFFFF",
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 13,
              opacity: (balance === 0 && !isSuccess) ? 0.6 : 1,
            }}
          >
            {isWithdrawing ? (
              <Loader2 className="animate-spin" size={16} />
            ) : isSuccess ? (
              <>
                <CheckCircle2 size={16} />
                Para Başarıyla Aktarıldı
              </>
            ) : (
              <>
                <Landmark size={16} />
                {"IBAN'a Aktar"}
              </>
            )}
          </button>
        </div>

        <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary, marginBottom: 8 }}>Son İşlem Geçmişi</div>
        <div className="flex flex-col gap-2">
          {earnings.map((e) => (
            <div key={e.id} className="flex items-center justify-between p-3 rounded-xl border" style={{ background: COLORS.bg, borderColor: COLORS.border }}>
              <div>
                <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary }}>{e.title}</div>
                <div style={{ fontFamily: "Poppins", fontSize: 10, color: COLORS.muted }}>
                  {e.company} • {e.date}
                </div>
              </div>
              <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 13, color: COLORS.success }}>{e.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkerHomeScreen({ user, onOpenJob, onNavigate, favorites, onToggleFavorite, onQuickApply, searchHistory, onAddSearchHistory }: any) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(false);
  const [minPay, setMinPay] = useState(0);
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleWorkType = (wt: string) => {
    setWorkTypes((prev) => (prev.includes(wt) ? prev.filter((x) => x !== wt) : [...prev, wt]));
  };
  const resetFilters = () => {
    setMinPay(0);
    setWorkTypes([]);
    setMaxDistance(null);
  };
  const filtersActive = minPay > 0 || workTypes.length > 0 || maxDistance !== null;

  const filteredJobs = JOB_LISTINGS.filter((j) => {
    if (activeCategory !== "all" && j.category !== activeCategory) return false;
    if (parsePay(j.pay) < minPay) return false;
    if (workTypes.length > 0 && !workTypes.includes(j.workType)) return false;
    if (maxDistance !== null && j.distanceKm > maxDistance) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const haystack = `${j.title} ${j.company} ${j.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
  const headingText = activeCategory === "all" ? "Yakınımdaki İşler" : `${activeCategory} İlanları`;
  const firstName = user.name.split(" ")[0];

  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: COLORS.bg }}>
      <StatusBar />
      <div className="px-6 pt-3 flex items-center justify-between">
        <div>
          <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 18, color: COLORS.secondary }}>Merhaba {firstName} 👋</div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted }}>Bugün nasıl bir iş arıyorsun?</div>
        </div>
        <button
          onClick={() => onNavigate("alerts")}
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border"
          style={{ background: COLORS.white, borderColor: COLORS.border }}
        >
          <Bell size={16} color={COLORS.secondary} />
        </button>
      </div>

      <div className="px-6 mt-4 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <Search size={16} color={COLORS.textLight} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => {
              setSearchFocused(false);
              if (searchQuery.trim()) onAddSearchHistory(searchQuery.trim());
            }}
            placeholder="İş ara..."
            className="flex-1 outline-none bg-transparent min-w-0"
            style={{ fontFamily: "Poppins", fontSize: 13, color: COLORS.secondary, border: "none" }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="flex-shrink-0 cursor-pointer">
              <X size={14} color={COLORS.textLight} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer border"
          style={{ background: COLORS.white, borderColor: COLORS.border }}
        >
          <SlidersHorizontal size={16} color={COLORS.secondary} />
          {filtersActive && <span className="absolute rounded-full" style={{ width: 8, height: 8, top: 6, right: 6, background: COLORS.accent }} />}
        </button>
      </div>

      {searchFocused && !searchQuery && searchHistory.length > 0 && (
        <div className="px-6 mt-2 flex flex-wrap gap-2">
          {searchHistory.map((h: string) => (
            <button
              key={h}
              onMouseDown={() => setSearchQuery(h)}
              className="px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer border"
              style={{ background: COLORS.white, borderColor: COLORS.border }}
            >
              <Clock size={11} color={COLORS.textLight} />
              <span style={{ fontFamily: "Poppins", fontSize: 11, color: COLORS.muted }}>{h}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-4" style={{ width: "max-content", paddingLeft: 24, paddingRight: 24 }}>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer"
                style={{ width: 58 }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: isActive ? cat.color : cat.tint }}>
                  <Icon size={22} color={isActive ? "#FFFFFF" : cat.color} strokeWidth={1.8} />
                </div>
                <span style={{ fontFamily: "Poppins", fontSize: 11, fontWeight: isActive ? 600 : 500, color: isActive ? cat.color : COLORS.muted }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* HAFTANIN YILDIZLARI (Leaderboard) */}
      <div className="mt-6 px-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy size={18} color={COLORS.accent} />
            <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 15, color: COLORS.secondary }}>Haftanın Yıldızları</span>
          </div>
          <span className="cursor-pointer" style={{ fontFamily: "Poppins", fontSize: 11, color: COLORS.primary, fontWeight: 600 }}>Tümünü Gör</span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2" style={{ marginRight: -24, paddingRight: 24 }}>
          {TOP_WORKERS.map((worker, idx) => (
            <div key={worker.id} className="flex-shrink-0 rounded-2xl p-3 border relative flex flex-col items-center" style={{ width: 104, background: COLORS.white, borderColor: COLORS.border, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              {idx === 0 && (
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#FCD34D", border: `2px solid ${COLORS.white}`, zIndex: 10, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                  <Crown size={14} color="#B45309" fill="#B45309" />
                </div>
              )}
              {idx === 1 && (
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#E2E8F0", border: `2px solid ${COLORS.white}`, zIndex: 10, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                  <Award size={14} color="#475569" />
                </div>
              )}
              {idx === 2 && (
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#FDBA74", border: `2px solid ${COLORS.white}`, zIndex: 10, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                  <Award size={14} color="#9A3412" />
                </div>
              )}
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2 relative" style={{ background: "linear-gradient(135deg,#2563EB,#0F172A)" }}>
                <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 18, color: "#FFFFFF" }}>{worker.name.charAt(0)}</span>
              </div>
              <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary, textAlign: "center", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {worker.name}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star size={12} color={COLORS.accent} fill={COLORS.accent} />
                <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 11, color: COLORS.secondary }}>{worker.rating}</span>
              </div>
              <div style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 10, color: COLORS.muted, marginTop: 4 }}>
                {worker.jobs} Görev
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-6 flex items-center justify-between">
        <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>{headingText}</div>
        <div className="flex items-center rounded-full p-1 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <button
            onClick={() => setViewMode("list")}
            className="rounded-full flex items-center justify-center cursor-pointer"
            style={{ width: 26, height: 26, background: viewMode === "list" ? COLORS.primary : "transparent" }}
          >
            <List size={13} color={viewMode === "list" ? "#FFFFFF" : COLORS.textLight} />
          </button>
          <button
            onClick={() => setViewMode("map")}
            className="rounded-full flex items-center justify-center cursor-pointer"
            style={{ width: 26, height: 26, background: viewMode === "map" ? COLORS.primary : "transparent" }}
          >
            <Map size={13} color={viewMode === "map" ? "#FFFFFF" : COLORS.textLight} />
          </button>
          <button
            onClick={() => setViewMode("radar")}
            title="Mesafe Radarı"
            className="rounded-full flex items-center justify-center cursor-pointer"
            style={{ width: 26, height: 26, background: viewMode === "radar" ? COLORS.primary : "transparent" }}
          >
            <Radar size={13} color={viewMode === "radar" ? "#FFFFFF" : COLORS.textLight} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 mt-3 pb-24">
        {viewMode === "map" ? (
          <MapView jobs={filteredJobs} onOpenJob={onOpenJob} />
        ) : viewMode === "radar" ? (
          <RadarView jobs={filteredJobs} onOpenJob={onOpenJob} />
        ) : filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-8 px-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
              <Search size={22} color={COLORS.textLight} />
            </div>
            <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Bu kriterlere uygun ilan yok</div>
            <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.textLight, marginTop: 4 }}>
              Farklı bir kategori veya filtre deneyebilirsin.
            </div>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isFavorite={!!favorites[job.id]}
              onToggleFavorite={onToggleFavorite}
              onOpen={() => onOpenJob(job)}
              onQuickApply={onQuickApply}
            />
          ))
        )}
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />

      {showFilters && (
        <FilterModal
          minPay={minPay}
          setMinPay={setMinPay}
          workTypes={workTypes}
          toggleWorkType={toggleWorkType}
          maxDistance={maxDistance}
          setMaxDistance={setMaxDistance}
          onReset={resetFilters}
          onClose={() => setShowFilters(false)}
          resultCount={filteredJobs.length}
        />
      )}
    </div>
  );
}

function JobDetailScreen({ job, onBack, onApply, onMessage }: any) {
  const payVal = parsePay(job.pay);
  const payDiff = Math.round(((payVal - AVG_MARKET_PAY) / AVG_MARKET_PAY) * 100);
  const payAnalysisText = payDiff > 0 ? `Piyasa ortalamasının %${payDiff} üzerinde` : payDiff < 0 ? `Piyasa ortalamasının %${Math.abs(payDiff)} altında` : "Piyasa ortalaması seviyesinde";

  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.white }}>
      <div className="relative h-44 flex-shrink-0" style={{ background: "linear-gradient(135deg,#1E293B,#0F172A)" }}>
        <StatusBar dark />
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          <ArrowLeft size={18} color="#FFFFFF" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-5 pb-28">
        <div className="flex items-start justify-between">
          <div>
            <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 20, color: COLORS.secondary }}>{job.title}</div>
            <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 13, color: COLORS.muted, marginTop: 2 }}>{job.company}</div>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} color={COLORS.accent} fill={COLORS.accent} />
            <span style={{ fontFamily: "Poppins", fontSize: 13, color: COLORS.secondary, fontWeight: 600 }}>
              {job.rating} ({job.reviews})
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: COLORS.success, fontFamily: "Poppins", fontWeight: 600, fontSize: 13 }}>
            {job.pay}
          </span>
          {job.difficulty && <DifficultyBadge level={job.difficulty} />}
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <TrendingUp size={14} color={payDiff >= 0 ? COLORS.success : "#EF4444"} />
          <span style={{ fontFamily: "Poppins", fontSize: 11, color: payDiff >= 0 ? COLORS.success : "#EF4444", fontWeight: 500 }}>
            {payAnalysisText}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Clock size={17} color={COLORS.primary} />
            <div>
              <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Çalışma Saatleri</div>
              <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted }}>{job.hours}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={17} color={COLORS.primary} />
            <div>
              <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Tarih</div>
              <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted }}>{job.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={17} color={COLORS.primary} />
            <div>
              <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Konum</div>
              <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted }}>{job.location}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl p-4 border" style={{ background: COLORS.bg, borderColor: COLORS.border }}>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={18} color={COLORS.primary} />
            <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 13, color: COLORS.secondary }}>Güvenilir İşveren Profili</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.muted }}>Zamanında Ödeme Skoru</span>
              <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.success }}>%98 Başarılı</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.muted }}>Çalışan Memnuniyeti</span>
              <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.primary }}>{job.rating} / 5</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.muted }}>Ortalama Yanıt Süresi</span>
              <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary }}>15 Dakika</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Açıklama</div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted, marginTop: 4, lineHeight: 1.7 }}>{job.description}</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t flex gap-3" style={{ background: COLORS.white, borderColor: COLORS.border }}>
        <button
          onClick={onMessage}
          className="flex-1 py-3.5 rounded-xl border-2 cursor-pointer"
          style={{ background: COLORS.white, borderColor: COLORS.secondary, color: COLORS.secondary, fontFamily: "Poppins", fontWeight: 600, fontSize: 13 }}
        >
          İşverene Mesaj Gönder
        </button>
        <button
          onClick={onApply}
          className="flex-1 py-3.5 rounded-xl cursor-pointer"
          style={{ background: COLORS.primary, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 15 }}
        >
          Başvur
        </button>
      </div>
    </div>
  );
}

function ApplicationSuccessScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.white }}>
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(16,185,129,0.15)" }}>
          <CheckCircle2 size={54} color={COLORS.success} strokeWidth={1.6} />
        </div>
        <div className="text-center" style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 20, color: COLORS.secondary, lineHeight: 1.4 }}>
          Başvurunuz başarıyla iletildi!
        </div>
        <div className="text-center mt-3" style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>
          İşveren en kısa sürede dönüş yapacaktır.
        </div>
      </div>
      <div className="px-6 pb-8">
        <button
          onClick={onDone}
          className="w-full py-3.5 rounded-xl cursor-pointer"
          style={{ background: COLORS.primary, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 15 }}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

const MESSAGES = [
  { id: 1, name: "İstanbul Catering", initial: "İ", color: "#2563EB", preview: "Yarınki etkinlik için 18:00'de bekleriz.", time: "14:32", unread: true },
  { id: 2, name: "Marmara Lojistik", initial: "M", color: "#F97316", preview: "Merhaba, yarınki iş için...", time: "13:45", unread: false },
  { id: 3, name: "Bursa Organizasyon", initial: "B", color: "#10B981", preview: "Teşekkür ederiz, görüşürüz.", time: "12:10", unread: false },
  { id: 4, name: "Ege Temizlik", initial: "E", color: "#0F172A", preview: "Belgeleriniz bize ulaştı.", time: "Dün", unread: false },
  { id: 5, name: "Akdeniz Otelcilik", initial: "A", color: "#2563EB", preview: "Pazartesi günü görüşürüz.", time: "2 Gün Önce", unread: false },
];

function MessagesScreen({ onNavigate, onOpenChat }: any) {
  const [query, setQuery] = useState("");
  const filtered = MESSAGES.filter((m) => m.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: COLORS.bg }}>
      <StatusBar />
      <div className="px-6 pt-3 flex items-center justify-between">
        <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 20, color: COLORS.secondary }}>Mesajlar</div>
        <button
          onClick={() => onNavigate("alerts")}
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border"
          style={{ background: COLORS.white, borderColor: COLORS.border }}
        >
          <Bell size={16} color={COLORS.secondary} />
        </button>
      </div>

      <div className="px-6 mt-4">
        <div className="flex items-center gap-2 rounded-xl px-4 py-3 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <Search size={16} color={COLORS.textLight} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ara..."
            className="flex-1 outline-none bg-transparent min-w-0"
            style={{ fontFamily: "Poppins", fontSize: 13, color: COLORS.secondary, border: "none" }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="flex-shrink-0 cursor-pointer">
              <X size={14} color={COLORS.textLight} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 mt-4 pb-24">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-8 px-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
              <Search size={22} color={COLORS.textLight} />
            </div>
            <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Sonuç bulunamadı</div>
          </div>
        ) : (
          filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => onOpenChat(m)}
              className="w-full rounded-2xl p-3 flex items-center gap-3 text-left mb-2 cursor-pointer border"
              style={{ background: COLORS.white, borderColor: COLORS.border }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: m.color }}>
                <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 15, color: "#FFFFFF" }}>{m.initial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "Poppins", fontWeight: m.unread ? 700 : 600, fontSize: 13, color: COLORS.secondary }}>{m.name}</span>
                  <span style={{ fontFamily: "Poppins", fontSize: 10, color: COLORS.textLight }}>{m.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span
                    className="truncate"
                    style={{ fontFamily: "Poppins", fontWeight: m.unread ? 600 : 400, fontSize: 12, color: m.unread ? COLORS.secondary : COLORS.muted, maxWidth: 200 }}
                  >
                    {m.preview}
                  </span>
                  {m.unread && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS.success }} />}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <BottomNav active="chat" onNavigate={onNavigate} />
    </div>
  );
}

function ChatDetailScreen({ chat, onBack }: any) {
  const [messages, setMessages] = useState(
    chat.preview
      ? [
          { id: 1, from: "them", text: "Merhaba, yarınki etkinlik için uygun musunuz?" },
          { id: 2, from: "me", text: "Merhaba, evet uygunum. Saat kaçta başlıyoruz?" },
          { id: 3, from: "them", text: chat.preview },
        ]
      : []
  );
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { id: prev.length + 1, from: "me", text: draft.trim() }]);
    setDraft("");
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.bg }}>
      <div className="flex-shrink-0 border-b" style={{ background: COLORS.white, borderColor: COLORS.border }}>
        <StatusBar />
        <div className="px-4 pb-3 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer" style={{ background: COLORS.bg }}>
            <ArrowLeft size={18} color={COLORS.secondary} />
          </button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: chat.color }}>
            <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 13, color: "#FFFFFF" }}>{chat.initial}</span>
          </div>
          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 14, color: COLORS.secondary }}>{chat.name}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-8 text-center">
            <span style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.textLight, lineHeight: 1.6 }}>
              Henüz mesaj yok. {chat.name} ile sohbete başlamak için bir mesaj gönderin.
            </span>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="flex" style={{ justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
              <div
                className="rounded-2xl px-3.5 py-2.5"
                style={{
                  maxWidth: "75%",
                  background: m.from === "me" ? COLORS.primary : COLORS.white,
                  color: m.from === "me" ? "#FFFFFF" : COLORS.secondary,
                  borderBottomRightRadius: m.from === "me" ? 4 : 16,
                  borderBottomLeftRadius: m.from === "me" ? 16 : 4,
                  boxShadow: m.from === "me" ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex-shrink-0 px-3 py-3 flex items-center gap-2 border-t" style={{ background: COLORS.white, borderColor: COLORS.border }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.nativeEvent.isComposing && (e as any).keyCode !== 229 && send()}
          placeholder="Mesaj yaz..."
          className="flex-1 rounded-full px-4 py-2.5 outline-none"
          style={{ background: COLORS.bg, fontFamily: "Poppins", fontSize: 13, color: COLORS.secondary, border: "none" }}
        />
        <button onClick={send} className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer" style={{ background: COLORS.primary }}>
          <Send size={16} color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
}

const SKILL_POOL = [
  "POS Kullanımı",
  "B Sınıfı Ehliyet",
  "Müşteri İlişkileri",
  "Kurye Tecrübesi",
  "İngilizce",
  "Esnek Saatler",
  "Python",
  "React",
  "Kasa Yönetimi",
  "İletişim Becerisi",
];
const LANGUAGE_SKILLS = [
  { label: "Türkçe", level: "Ana Dil" },
  { label: "İngilizce", level: "Orta Düzey - Müşteri Karşılama" },
];
const VERIFIED_SKILLS = ["Hijyen Sertifikası", "Hızlı Yanıt Veren Çalışan", "5 Yıldızlı Hizmet Uzmanı"];

function WorkerProfileScreen({
  user,
  skills,
  isNewUser,
  onChangeAvatar,
  onNavigate,
  onOpenSettings,
  onOpenWallet,
  completedJobsCount,
  showcasedBadgeIds,
  onUpdateShowcase
}: any) {
  const [cvDownloaded, setCvDownloaded] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [isEditingShowcase, setIsEditingShowcase] = useState(false);
  const [tempShowcase, setTempShowcase] = useState<number[]>(showcasedBadgeIds);

  const handleDownloadCV = () => {
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 2200);
  };

  const achievements: { emoji: string; label: string }[] = [];
  if (!isNewUser) {
    if (completedJobsCount >= 1) achievements.push({ emoji: "🎉", label: "İlk Görev Tamamlandı" });
    if (completedJobsCount >= 3) achievements.push({ emoji: "🌟", label: "3+ Tamamlanan Görev" });
    if (completedJobsCount >= 5) achievements.push({ emoji: "🌟", label: "5+ Başarılı Görev" });
    achievements.push({ emoji: "⚡", label: "Hızlı Yanıt Veren" });
  }

  const toggleTempBadge = (id: number) => {
    if (tempShowcase.includes(id)) {
      setTempShowcase(tempShowcase.filter((bId) => bId !== id));
    } else {
      if (tempShowcase.length < 5) {
        setTempShowcase([...tempShowcase, id]);
      }
    }
  };

  const saveShowcase = () => {
    onUpdateShowcase(tempShowcase);
    setIsEditingShowcase(false);
  };

  const renderedShowcase = ALL_BADGES.filter(b => showcasedBadgeIds.includes(b.id));

  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: COLORS.bg }}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 pt-3 flex items-center justify-between">
          <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 20, color: COLORS.secondary }}>Profil</div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenWallet}
              title="Cüzdanım"
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border"
              style={{ background: COLORS.white, borderColor: COLORS.border }}
            >
              <Wallet size={16} color={COLORS.success} />
            </button>
            <button
              onClick={onOpenSettings}
              title="Ayarlar"
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border"
              style={{ background: COLORS.white, borderColor: COLORS.border }}
            >
              <Settings size={16} color={COLORS.secondary} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4 px-6">
          <Avatar
            name={user.name}
            photo={user.avatar}
            size={96}
            fontSize={32}
            onPick={(file) => readFileAsBase64(file).then(onChangeAvatar)}
          />
          <div className="mt-3" style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 18, color: COLORS.secondary }}>
            {user.name}
          </div>
          <div className="flex items-center gap-1 mt-1" style={{ color: COLORS.muted }}>
            <MapPin size={13} />
            <span style={{ fontFamily: "Poppins", fontSize: 12 }}>İstanbul, Türkiye</span>
          </div>
          {isNewUser ? (
            <div style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 12, color: COLORS.textLight, marginTop: 4 }}>Henüz değerlendirme yok</div>
          ) : (
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} color={COLORS.accent} fill={COLORS.accent} />
              <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>
                4.9 <span style={{ fontWeight: 400, color: COLORS.textLight }}>(56)</span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)" }}>
            <BadgeCheck size={14} color={COLORS.success} />
            <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 11, color: COLORS.success }}>Doğrulanmış Hesap</span>
          </div>
        </div>

        {/* 20 Rozetli Vitrin Bölümü */}
        <div className="px-6 mt-5">
          <div className="flex items-center justify-between mb-2">
            <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Rozet Vitrini</div>
            <button
              onClick={() => { setTempShowcase(showcasedBadgeIds); setIsEditingShowcase(true); }}
              className="cursor-pointer"
              style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.primary }}
            >
              Vitrini Düzenle
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {renderedShowcase.length === 0 && (
              <span style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.textLight, padding: "8px 0" }}>
                Vitrinde henüz rozet yok. Düzenle diyerek seçebilirsin.
              </span>
            )}
            {renderedShowcase.map((badge) => {
              const Icon = badge.icon;
              return (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer relative"
                  style={{ width: 64 }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: badge.unlocked ? badge.gradient : COLORS.border,
                      boxShadow: badge.unlocked ? "0 4px 12px rgba(0,0,0,0.12)" : "none",
                      opacity: badge.unlocked ? 1 : 0.6,
                    }}
                  >
                    <Icon size={24} color="#FFFFFF" strokeWidth={2} />
                    {!badge.unlocked && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: COLORS.secondary }}>
                        <Lock size={10} color="#FFFFFF" />
                      </span>
                    )}
                  </div>
                  <span className="text-center truncate w-full" style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 9, color: COLORS.muted }}>
                    {badge.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {!isNewUser && (
          <div className="px-6 mt-5">
            <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Başarı Kartı</div>
            <div className="flex flex-wrap gap-2 mt-3">
              {achievements.map((a, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full flex items-center gap-1.5 border"
                  style={{ background: COLORS.white, borderColor: COLORS.border, fontFamily: "Poppins", fontWeight: 600, fontSize: 11, color: COLORS.secondary }}
                >
                  <span>{a.emoji}</span>
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 mt-6">
          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Hakkında</div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted, marginTop: 6, lineHeight: 1.7 }}>
            {user.bio || "Henüz bir açıklama eklenmedi. Profilini Düzenle ekranından kendini işverenlere tanıtabilirsin."}
          </div>
        </div>

        <div className="px-6 mt-5">
          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Deneyim</div>
          <div className="flex items-center gap-2 mt-2">
            <Award size={15} color={COLORS.primary} />
            <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 12, color: COLORS.muted }}>
              {isNewUser ? "Henüz deneyim eklenmedi" : "5 Yıl"}
            </span>
          </div>
        </div>

        <div className="px-6 mt-5">
          <div className="flex items-center justify-between">
            <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Yetenekler</div>
          </div>

          <div className="flex items-center justify-between mt-3 mb-1.5">
            <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 11, color: COLORS.textLight }}>SEKTÖREL YETENEKLER</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s: string) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
                style={{ background: "rgba(37,99,235,0.1)", color: COLORS.primary, fontFamily: "Poppins", fontWeight: 500, fontSize: 11 }}
              >
                {s}
              </span>
            ))}
            {skills.length === 0 && (
              <span style={{ fontFamily: "Poppins", fontSize: 11, color: COLORS.textLight }}>
                Henüz sektörel yetenek eklenmedi. {"\"Profili Düzenle\"den seçebilirsin."}
              </span>
            )}
          </div>

          <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 11, color: COLORS.textLight, marginTop: 14, marginBottom: 6 }}>DİL BECERİLERİ</div>
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_SKILLS.map((l) => (
              <span
                key={l.label}
                className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
                style={{ background: "rgba(37,99,235,0.1)", color: COLORS.primary, fontFamily: "Poppins", fontWeight: 500, fontSize: 11 }}
              >
                <Globe size={11} />
                {l.label}
                <span style={{ opacity: 0.7, fontWeight: 400 }}>· {l.level}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="px-6 mt-6">
          <button
            onClick={handleDownloadCV}
            className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            style={{ background: COLORS.secondary, color: COLORS.bg, fontFamily: "Poppins", fontWeight: 600, fontSize: 14 }}
          >
            {cvDownloaded ? (
              <>
                <CheckCircle2 size={17} color={COLORS.bg} />
                CV Hazırlandı
              </>
            ) : (
              <>
                <Download size={17} color={COLORS.bg} />
                CV Olarak İndir
              </>
            )}
          </button>
        </div>
      </div>

      {/* VİTRİN DÜZENLEME MODALI */}
      {isEditingShowcase && (
        <div className="absolute inset-0 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.6)", zIndex: 70 }} onClick={() => setIsEditingShowcase(false)}>
          <div
            className="rounded-t-3xl px-5 pt-4 pb-8 border-t flex flex-col"
            style={{ background: COLORS.white, borderColor: COLORS.border, height: "85%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1.5 rounded-full mx-auto mb-4 flex-shrink-0" style={{ background: COLORS.border }} />
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 16, color: COLORS.secondary }}>Vitrini Düzenle</span>
              <button onClick={() => setIsEditingShowcase(false)} className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: COLORS.bg }}>
                <X size={14} color={COLORS.secondary} />
              </button>
            </div>
            <div className="mb-4 flex-shrink-0" style={{ fontFamily: "Poppins", fontSize: 12, color: COLORS.muted }}>
              Profilinde öne çıkarmak istediğin en fazla 5 rozeti seç. <strong style={{ color: COLORS.primary }}>({tempShowcase.length}/5)</strong>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-3 gap-3 pb-4">
              {ALL_BADGES.map((badge) => {
                const Icon = badge.icon;
                const isSelected = tempShowcase.includes(badge.id);
                const isDisabled = !isSelected && tempShowcase.length >= 5;
                return (
                  <button
                    key={badge.id}
                    onClick={() => toggleTempBadge(badge.id)}
                    disabled={isDisabled}
                    className="p-3 rounded-2xl flex flex-col items-center gap-2 border text-center cursor-pointer transition relative"
                    style={{
                      background: isSelected ? "rgba(37,99,235,0.06)" : COLORS.bg,
                      borderColor: isSelected ? COLORS.primary : COLORS.border,
                      opacity: isDisabled ? 0.4 : 1,
                    }}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: COLORS.primary, zIndex: 10 }}>
                        <CheckCircle2 size={12} color="#FFFFFF" />
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center relative" style={{ background: badge.unlocked ? badge.gradient : COLORS.border, opacity: badge.unlocked ? 1 : 0.6 }}>
                      <Icon size={22} color="#FFFFFF" />
                      {!badge.unlocked && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: COLORS.secondary }}>
                          <Lock size={8} color="#FFFFFF" />
                        </span>
                      )}
                    </div>
                    <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 10, color: COLORS.secondary, lineHeight: 1.2 }}>{badge.title}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={saveShowcase}
              className="w-full py-3.5 rounded-xl mt-4 cursor-pointer flex-shrink-0"
              style={{ background: COLORS.primary, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 15 }}
            >
              Kaydet
            </button>
          </div>
        </div>
      )}

      {/* TEKİL ROZET DETAY MODALI */}
      {selectedBadge && (
        <div className="absolute inset-0 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.65)", zIndex: 80 }} onClick={() => setSelectedBadge(null)}>
          <div
            className="w-full rounded-3xl p-6 border text-center relative"
            style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedBadge(null)} className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: COLORS.bg }}>
              <X size={14} color={COLORS.secondary} />
            </button>

            <div
              className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-4 relative"
              style={{ background: selectedBadge.unlocked ? selectedBadge.gradient : COLORS.border, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
            >
              {React.createElement(selectedBadge.icon, { size: 36, color: "#FFFFFF", strokeWidth: 2 })}
              {!selectedBadge.unlocked && (
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: COLORS.secondary }}>
                  <Lock size={12} color="#FFFFFF" />
                </span>
              )}
            </div>

            <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 18, color: COLORS.secondary }}>{selectedBadge.title}</div>
            <div
              className="inline-block px-3 py-1 rounded-full my-2"
              style={{ background: selectedBadge.unlocked ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)", color: selectedBadge.unlocked ? COLORS.success : "#EF4444", fontFamily: "Poppins", fontWeight: 600, fontSize: 11 }}
            >
              {selectedBadge.unlocked ? "✓ Kazanıldı (Aktif)" : "🔒 Kilitli Rozet"}
            </div>
            <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 13, color: COLORS.muted, lineHeight: 1.6, marginTop: 4 }}>
              {selectedBadge.desc}
            </div>
          </div>
        </div>
      )}

      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "İnceleniyor": { bg: "rgba(245,158,11,0.18)", color: "#B45309" },
    "Görüşmeye Çağrıldı": { bg: "rgba(37,99,235,0.15)", color: COLORS.primary },
    "Kabul Edildi": { bg: "rgba(16,185,129,0.15)", color: COLORS.success },
    "Tamamlandı": { bg: "rgba(148,163,184,0.18)", color: COLORS.muted },
  };
  const s = map[status] || map["İnceleniyor"];
  return (
    <span className="px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: s.bg, color: s.color, fontFamily: "Poppins", fontWeight: 600, fontSize: 10 }}>
      {status}
    </span>
  );
}

const PENDING_APPLICATIONS = [
  { id: 1, title: "Garson", company: "İstanbul Catering", date: "Başvuru: 20 Mayıs 2024", status: "İnceleniyor" },
  { id: 2, title: "Motorlu Kurye", company: "Marmara Lojistik", date: "Başvuru: 22 Mayıs 2024", status: "Kabul Edildi" },
  { id: 3, title: "Kasiyer", company: "Merkez Market", date: "Başvuru: 24 Mayıs 2024", status: "İnceleniyor" },
  { id: 4, title: "Fuar Hostu / İngilizce Bilen Karşılama", company: "İstanbul Fuar Merkezi", date: "Başvuru: 25 Mayıs 2024", status: "Görüşmeye Çağrıldı" },
];

const PAST_JOBS = [
  { id: 1, title: "Temizlik Görevlisi", company: "Ege Temizlik", date: "12 Mayıs 2024" },
  { id: 2, title: "Garson", company: "Akdeniz Otelcilik", date: "3 Mayıs 2024" },
  { id: 3, title: "Depo Elemanı", company: "Bursa Organizasyon", date: "28 Nisan 2024" },
];

function RatingModal({ job, onClose, onSubmit }: any) {
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [review, setReview] = useState("");
  const displayStars = hoverStars || stars;

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.6)", zIndex: 50 }}>
      <div className="w-full rounded-2xl p-5 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
        <div className="flex items-start justify-between mb-1">
          <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 15, color: COLORS.secondary, maxWidth: 230 }}>
            {job.company} şirketini değerlendirin
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer" style={{ background: COLORS.bg }}>
            <X size={14} color={COLORS.secondary} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 my-4" onMouseLeave={() => setHoverStars(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setStars(n)} onMouseEnter={() => setHoverStars(n)} className="cursor-pointer">
              <Star size={30} color={COLORS.accent} fill={n <= displayStars ? COLORS.accent : "none"} strokeWidth={1.6} />
            </button>
          ))}
        </div>

        <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary, marginBottom: 6 }}>Yorumunuz</div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={3}
          placeholder="Deneyiminizi paylaşın..."
          style={{
            width: "100%",
            fontFamily: "Poppins",
            fontSize: 13,
            color: COLORS.secondary,
            background: COLORS.bg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: "11px 14px",
            outline: "none",
            resize: "none",
          }}
        />

        <button
          onClick={() => stars > 0 && onSubmit(stars, review)}
          disabled={stars === 0}
          className="w-full py-3 rounded-xl mt-4 cursor-pointer"
          style={{ background: stars > 0 ? COLORS.primary : COLORS.border, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 14 }}
        >
          Gönder
        </button>
      </div>
    </div>
  );
}

function ApplicationsScreen({ onNavigate, jobRatings, onRateJob, favorites, onToggleFavorite, onOpenJob, onQuickApply, onAddToCalendar }: any) {
  const [tab, setTab] = useState("pending");
  const [ratingTarget, setRatingTarget] = useState<any>(null);
  const list = tab === "pending" ? PENDING_APPLICATIONS : PAST_JOBS;
  const savedJobs = JOB_LISTINGS.filter((j) => favorites[j.id]);

  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: COLORS.bg }}>
      <StatusBar />
      <div className="px-6 pt-3">
        <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 20, color: COLORS.secondary }}>Başvurularım</div>
      </div>

      <div className="px-6 mt-4 flex gap-1.5">
        <button
          onClick={() => setTab("pending")}
          className="flex-1 py-2.5 rounded-xl cursor-pointer"
          style={{ background: tab === "pending" ? COLORS.primary : COLORS.white, color: tab === "pending" ? "#FFFFFF" : COLORS.muted, fontFamily: "Poppins", fontWeight: 600, fontSize: 11 }}
        >
          Bekleyen Başvurular
        </button>
        <button
          onClick={() => setTab("history")}
          className="flex-1 py-2.5 rounded-xl cursor-pointer"
          style={{ background: tab === "history" ? COLORS.primary : COLORS.white, color: tab === "history" ? "#FFFFFF" : COLORS.muted, fontFamily: "Poppins", fontWeight: 600, fontSize: 11 }}
        >
          Geçmiş İşlerim
        </button>
        <button
          onClick={() => setTab("saved")}
          className="flex-1 py-2.5 rounded-xl cursor-pointer"
          style={{ background: tab === "saved" ? COLORS.primary : COLORS.white, color: tab === "saved" ? "#FFFFFF" : COLORS.muted, fontFamily: "Poppins", fontWeight: 600, fontSize: 11 }}
        >
          Kaydedilenler
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 mt-4 pb-24">
        {tab === "saved" ? (
          savedJobs.length === 0 ? (
            <div className="flex flex-col items-center text-center mt-8 px-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(239,68,68,0.12)" }}>
                <Heart size={22} color="#F87171" />
              </div>
              <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>Henüz kaydedilen ilan yok</div>
              <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.textLight, marginTop: 4 }}>
                Beğendiğin ilanların kalp ikonuna dokunarak buraya kaydedebilirsin.
              </div>
            </div>
          ) : (
            savedJobs.map((job) => (
              <JobCard key={job.id} job={job} isFavorite={true} onToggleFavorite={onToggleFavorite} onOpen={() => onOpenJob(job)} onQuickApply={onQuickApply} />
            ))
          )
        ) : (
          list.map((item: any) => (
            <div key={item.id} className="w-full rounded-2xl p-4 flex flex-col gap-1.5 mb-3 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 14, color: COLORS.secondary }}>{item.title}</div>
                  <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted }}>{item.company}</div>
                </div>
                <StatusBadge status={tab === "pending" ? item.status : "Tamamlandı"} />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span style={{ fontFamily: "Poppins", fontSize: 11, color: COLORS.textLight }}>{item.date}</span>
              </div>

              {tab === "pending" && item.status === "Kabul Edildi" && (
                <button
                  onClick={() => onAddToCalendar(item)}
                  className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl cursor-pointer"
                  style={{ background: "rgba(37,99,235,0.1)", color: COLORS.primary, fontFamily: "Poppins", fontWeight: 600, fontSize: 12 }}
                >
                  <CalendarPlus size={16} /> İş Gününü Takvime Ekle
                </button>
              )}

              {tab === "history" &&
                (jobRatings[item.id] ? (
                  <div className="flex items-center gap-1.5 mt-2 pt-2" style={{ borderTop: `1px solid ${COLORS.border}` }}>
                    <Star size={14} color={COLORS.accent} fill={COLORS.accent} />
                    <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary }}>{jobRatings[item.id].rating}.0</span>
                    <span style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 11, color: COLORS.textLight }}>verdiğiniz puan</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setRatingTarget(item)}
                    className="mt-2 py-2 rounded-xl border-2 cursor-pointer"
                    style={{ borderColor: COLORS.accent, color: COLORS.accent, background: COLORS.white, fontFamily: "Poppins", fontWeight: 600, fontSize: 12 }}
                  >
                    İşi Değerlendir
                  </button>
                ))}
            </div>
          ))
        )}
      </div>

      <BottomNav active="jobs" onNavigate={onNavigate} />

      {ratingTarget && (
        <RatingModal
          job={ratingTarget}
          onClose={() => setRatingTarget(null)}
          onSubmit={(stars: number, review: string) => {
            onRateJob(ratingTarget.id, { rating: stars, review });
            setRatingTarget(null);
          }}
        />
      )}
    </div>
  );
}

const NOTIFICATIONS = [
  {
    id: 1,
    icon: FileText,
    iconColor: COLORS.primary,
    iconBg: "rgba(37,99,235,0.12)",
    title: "Yeni Başvuru Alındı",
    desc: "Garson ilanına başvurunuz işverene iletildi.",
    time: "10 dk önce",
    action: { type: "applications" },
  },
  {
    id: 2,
    icon: MessageCircle,
    iconColor: COLORS.accent,
    iconBg: "rgba(249,115,22,0.12)",
    title: "Yeni Mesajınız Var",
    desc: "İstanbul Catering size bir mesaj gönderdi.",
    time: "1 sa önce",
    action: { type: "chat", company: "İstanbul Catering" },
  },
  {
    id: 3,
    icon: CheckCircle2,
    iconColor: COLORS.success,
    iconBg: "rgba(16,185,129,0.12)",
    title: "İşe Alındınız",
    desc: "Tebrikler! Marmara Lojistik sizi işe aldı.",
    time: "Dün",
    action: { type: "applications" },
  },
];

function NotificationsScreen({ onNavigate, onOpenNotification }: any) {
  return (
    <div className="w-full h-full flex flex-col relative" style={{ background: COLORS.bg }}>
      <StatusBar />
      <div className="px-6 pt-3">
        <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 20, color: COLORS.secondary }}>Bildirimler</div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 mt-4 pb-24">
        {NOTIFICATIONS.map((n) => {
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              onClick={() => onOpenNotification(n)}
              className="w-full rounded-2xl p-3 flex items-start gap-3 mb-2 text-left cursor-pointer border"
              style={{ background: COLORS.white, borderColor: COLORS.border }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: n.iconBg }}>
                <Icon size={18} color={n.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>{n.title}</span>
                  <span style={{ fontFamily: "Poppins", fontSize: 10, color: COLORS.textLight, flexShrink: 0 }}>{n.time}</span>
                </div>
                <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{n.desc}</div>
              </div>
              <ChevronRight size={16} color={COLORS.border} className="flex-shrink-0 mt-1" />
            </button>
          );
        })}
      </div>

      <BottomNav active="alerts" onNavigate={onNavigate} />
    </div>
  );
}

const SETTINGS_ITEMS = [
  { key: "edit", icon: User, label: "Profili Düzenle" },
  { key: "identity", icon: BadgeCheck, label: "Kimlik Doğrulama", trailing: "Doğrulanmış", trailingColor: COLORS.success },
  { key: "payment", icon: CreditCard, label: "Ödeme Yöntemleri" },
  { key: "language", icon: Globe, label: "Dil Ayarları", trailing: "Türkçe", trailingColor: COLORS.textLight },
  { key: "notif", icon: Bell, label: "Bildirim Ayarları", trailing: "Açık", trailingColor: COLORS.textLight },
  { key: "support", icon: LifeBuoy, label: "Destek Merkezi" },
];

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative flex-shrink-0 cursor-pointer"
      style={{ width: 44, height: 26, borderRadius: 999, background: checked ? COLORS.primary : COLORS.border, transition: "background 0.2s ease" }}
    >
      <span
        className="absolute rounded-full"
        style={{ width: 20, height: 20, top: 3, left: checked ? 21 : 3, background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transition: "left 0.2s ease" }}
      />
    </button>
  );
}

function SettingsScreen({ user, isDarkMode, onToggleDarkMode, onBack, onLogout, onSelectItem }: any) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.bg }}>
      <StatusBar />
      <div className="px-4 pt-1 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <ArrowLeft size={18} color={COLORS.secondary} />
        </button>
        <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 15, color: COLORS.secondary }}>Ayarlar</div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <div className="flex flex-col items-center mt-2">
          <Avatar name={user.name} photo={user.avatar} size={80} fontSize={26} />
          <div className="mt-3" style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 16, color: COLORS.secondary }}>
            {user.name}
          </div>
        </div>

        <div className="mt-6 rounded-2xl overflow-hidden border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(37,99,235,0.12)" }}>
                {isDarkMode ? <Moon size={16} color={COLORS.primary} /> : <Sun size={16} color={COLORS.primary} />}
              </div>
              <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 13, color: COLORS.secondary }}>Gece Modu (Dark Mode)</span>
            </div>
            <ToggleSwitch checked={isDarkMode} onChange={onToggleDarkMode} />
          </div>
        </div>

        <div className="mt-4 rounded-2xl overflow-hidden border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          {SETTINGS_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => onSelectItem(item.key)}
                className="w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer"
                style={{ borderBottom: i < SETTINGS_ITEMS.length - 1 ? `1px solid ${COLORS.border}` : "none" }}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.12)" }}>
                  <Icon size={16} color={COLORS.primary} />
                </div>
                <span className="flex-1 text-left" style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 13, color: COLORS.secondary }}>
                  {item.label}
                </span>
                {item.trailing && (
                  <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 12, color: item.trailingColor }}>{item.trailing}</span>
                )}
                <ChevronRight size={16} color={COLORS.border} />
              </button>
            );
          })}
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mt-5 cursor-pointer border"
          style={{ background: COLORS.white, borderColor: COLORS.border }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.12)" }}>
            <LogOut size={16} color="#EF4444" />
          </div>
          <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: "#EF4444" }}>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
}

function SubScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="px-4 pt-1 flex items-center gap-3">
      <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
        <ArrowLeft size={18} color={COLORS.secondary} />
      </button>
      <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 15, color: COLORS.secondary }}>{title}</div>
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "Poppins",
  fontSize: 13,
  color: COLORS.secondary,
  background: COLORS.bg,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 12,
  padding: "11px 14px",
  outline: "none",
};
const fieldLabelStyle: React.CSSProperties = { fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary, marginBottom: 6 };

function EditProfileScreen({ user, skills, onToggleSkill, onUpdateUser, onChangeAvatar, onBack }: any) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [bio, setBio] = useState(user.bio || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdateUser({ name: name.trim() || user.name, email, phone, bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.bg }}>
      <StatusBar />
      <SubScreenHeader title="Profili Düzenle" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-6 mt-5 pb-10">
        <div className="flex flex-col items-center mb-6">
          <Avatar
            name={user.name}
            photo={user.avatar}
            size={88}
            fontSize={30}
            onPick={(file) => readFileAsBase64(file).then(onChangeAvatar)}
          />
          <span className="mt-3" style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.primary }}>
            Fotoğrafı Değiştir
          </span>
        </div>

        <div className="rounded-2xl p-4 flex flex-col gap-4 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <div>
            <div style={fieldLabelStyle}>Ad Soyad</div>
            <input value={name} onChange={(e) => setName(e.target.value)} style={fieldStyle} />
          </div>
          <div>
            <div style={fieldLabelStyle}>E-posta</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} style={fieldStyle} />
          </div>
          <div>
            <div style={fieldLabelStyle}>Telefon Numarası</div>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} style={fieldStyle} />
          </div>
        </div>

        <div className="rounded-2xl p-4 mt-4 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <div className="flex items-center justify-between mb-1">
            <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.secondary }}>Sektörel Yetenekler</span>
            <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 11, color: COLORS.textLight }}>{skills.length} seçili</span>
          </div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 11, color: COLORS.textLight, marginBottom: 12, lineHeight: 1.5 }}>
            Sana uyan yetenekleri seçmek için üzerlerine dokun. Tekrar dokunarak kaldırabilirsin.
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILL_POOL.map((skill) => {
              const active = skills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => onToggleSkill(skill)}
                  className="px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer transition"
                  style={{
                    background: active ? COLORS.primary : "rgba(37,99,235,0.08)",
                    color: active ? "#FFFFFF" : COLORS.primary,
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: 11,
                    border: active ? `1px solid ${COLORS.primary}` : "1px solid transparent",
                  }}
                >
                  {active && <CheckCircle2 size={12} color="#FFFFFF" />}
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl p-4 mt-4 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <div style={fieldLabelStyle}>Hakkımda / Mini CV</div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 11, color: COLORS.textLight, marginBottom: 8, lineHeight: 1.5 }}>
            Deneyimini, çalışma tercihlerini ve kendini işverenlere nasıl tanıtmak istediğini serbestçe yaz.
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={7}
            placeholder="Örn: 2 yıldır saha ve müşteri hizmetleri alanında çalışıyorum, hızlı öğrenen ve dakik bir ekip arkadaşıyım..."
            style={{ ...fieldStyle, resize: "none", lineHeight: 1.6, minHeight: 140 }}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-xl mt-5 cursor-pointer"
          style={{ background: COLORS.primary, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 15 }}
        >
          Kaydet
        </button>
        {saved && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <CheckCircle2 size={14} color={COLORS.success} />
            <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 12, color: COLORS.success }}>Değişiklikleriniz kaydedildi</span>
          </div>
        )}
      </div>
    </div>
  );
}

function IdentityVerificationScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.bg }}>
      <StatusBar />
      <SubScreenHeader title="Kimlik Doğrulama" onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-10" style={{ marginTop: -40 }}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(16,185,129,0.15)" }}>
          <CheckCircle2 size={56} color={COLORS.success} strokeWidth={1.6} />
        </div>
        <div className="text-center" style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 14, color: COLORS.secondary, lineHeight: 1.7 }}>
          Kimliğiniz başarıyla doğrulanmıştır. Platformda güvenle işlem yapabilirsiniz.
        </div>
      </div>
    </div>
  );
}

function PaymentMethodsScreen({ onBack }: { onBack: () => void }) {
  const [ibans, setIbans] = useState([{ id: 1, bank: "Ziraat Bankası", masked: "TR33 •••• •••• •••• 8413" }]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const addIban = () => {
    const digits = draft.replace(/\D/g, "");
    if (digits.length < 4) return;
    const last4 = digits.slice(-4);
    setIbans((prev) => [...prev, { id: prev.length + 1, bank: "Yeni Hesap", masked: `TR•• •••• •••• •••• ${last4}` }]);
    setDraft("");
    setAdding(false);
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.bg }}>
      <StatusBar />
      <SubScreenHeader title="Ödeme Yöntemleri" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-6 mt-5 pb-10">
        <div className="flex flex-col gap-3">
          {ibans.map((iban, i) => (
            <div key={iban.id} className="rounded-2xl p-4 flex items-center gap-3 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.12)" }}>
                <CreditCard size={18} color={COLORS.primary} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.secondary }}>{iban.bank}</div>
                <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{iban.masked}</div>
              </div>
              {i === 0 && (
                <span className="px-2 py-1 rounded-full flex-shrink-0" style={{ background: "rgba(37,99,235,0.12)", color: COLORS.primary, fontFamily: "Poppins", fontWeight: 600, fontSize: 10 }}>
                  Varsayılan
                </span>
              )}
            </div>
          ))}
        </div>

        {adding ? (
          <div className="rounded-2xl p-4 mt-3 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
            <div style={fieldLabelStyle}>IBAN Numarası</div>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="TR__ ____ ____ ____ ____ ____ __" style={fieldStyle} />
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  setAdding(false);
                  setDraft("");
                }}
                className="flex-1 py-2.5 rounded-xl cursor-pointer"
                style={{ background: COLORS.bg, color: COLORS.secondary, fontFamily: "Poppins", fontWeight: 600, fontSize: 13 }}
              >
                Vazgeç
              </button>
              <button
                onClick={addIban}
                className="flex-1 py-2.5 rounded-xl cursor-pointer"
                style={{ background: COLORS.primary, color: "#FFFFFF", fontFamily: "Poppins", fontWeight: 600, fontSize: 13 }}
              >
                Ekle
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="w-full py-3.5 rounded-xl mt-3 flex items-center justify-center gap-2 border-2 cursor-pointer"
            style={{ borderColor: COLORS.primary, borderStyle: "dashed", color: COLORS.primary, fontFamily: "Poppins", fontWeight: 600, fontSize: 13 }}
          >
            <Plus size={16} /> Yeni İban Ekle
          </button>
        )}
      </div>
    </div>
  );
}

function LanguageNotificationScreen({ onBack }: { onBack: () => void }) {
  const [notifJobs, setNotifJobs] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifStatus, setNotifStatus] = useState(false);

  const rows = [
    { key: "jobs", label: "Yeni iş ilanları", value: notifJobs, set: setNotifJobs },
    { key: "messages", label: "Mesaj bildirimleri", value: notifMessages, set: setNotifMessages },
    { key: "status", label: "Başvuru durumu güncellemeleri", value: notifStatus, set: setNotifStatus },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.bg }}>
      <StatusBar />
      <SubScreenHeader title="Dil & Bildirim Ayarları" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-6 mt-5 pb-10">
        <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 11, color: COLORS.textLight, marginBottom: 8 }}>DİL</div>
        <div className="rounded-2xl p-4 flex items-center justify-between mb-6 border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <div className="flex items-center gap-3">
            <Globe size={18} color={COLORS.primary} />
            <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 13, color: COLORS.secondary }}>Uygulama Dili</span>
          </div>
          <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 13, color: COLORS.textLight }}>Türkçe</span>
        </div>

        <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 11, color: COLORS.textLight, marginBottom: 8 }}>BİLDİRİMLER</div>
        <div className="rounded-2xl overflow-hidden border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          {rows.map((r, i) => (
            <div key={r.key} className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: i < rows.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
              <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 13, color: COLORS.secondary }}>{r.label}</span>
              <ToggleSwitch checked={r.value} onChange={r.set} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportCenterScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.bg }}>
      <StatusBar />
      <SubScreenHeader title="Destek Merkezi" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-6 mt-5 pb-10">
        <div className="flex flex-col items-center text-center mt-4 mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(37,99,235,0.12)" }}>
            <LifeBuoy size={28} color={COLORS.primary} />
          </div>
          <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 15, color: COLORS.secondary }}>Size nasıl yardımcı olabiliriz?</div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 12, color: COLORS.muted, marginTop: 4 }}>
            Sorularınız için bize aşağıdaki kanallardan ulaşabilirsiniz.
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border" style={{ background: COLORS.white, borderColor: COLORS.border }}>
          <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
            <Mail size={16} color={COLORS.primary} />
            <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 13, color: COLORS.secondary }}>destek@isimhazir.com</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Phone size={16} color={COLORS.primary} />
            <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 13, color: COLORS.secondary }}>0850 000 00 00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toast({ toast }: { toast: { message: string; icon: React.ReactNode } | null }) {
  if (!toast) return null;
  return (
    <div className="absolute left-0 right-0 flex justify-center px-6" style={{ top: 54, zIndex: 100, pointerEvents: "none" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-full" style={{ background: COLORS.secondary, boxShadow: "0 8px 20px rgba(0,0,0,0.35)" }}>
        {toast.icon}
        <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 12, color: COLORS.bg }}>{toast.message}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; phone: string; avatar: string | null; bio: string }>({
    name: "",
    email: "",
    phone: "",
    avatar: null,
    bio: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [activeJob, setActiveJob] = useState<any>(null);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [jobRatings, setJobRatings] = useState<Record<number, { rating: number; review: string }>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; icon: React.ReactNode } | null>(null);
  const [showWallet, setShowWallet] = useState(false);
  
  // Rozet vitrini için saklanan state (başlangıçta açık olan birkaç rozet ID'si)
  const [showcasedBadgeIds, setShowcasedBadgeIds] = useState<number[]>([1, 2, 3, 6, 16]);

  const isNewUser = skills.length === 0 && (!user.bio || user.bio.trim() === "");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem(THEME_STORAGE_KEY) === "dark") setIsDarkMode(true);
    }
    if (screen === "splash") {
      const t = setTimeout(() => {
        const users = seedDefaultUser();
        const sessionEmail = getSession();
        const restored = sessionEmail ? users.find((u: any) => u.email.toLowerCase() === sessionEmail.toLowerCase()) : null;
        if (restored) {
          setUser({ name: restored.name, email: restored.email, phone: restored.phone || "", avatar: restored.avatar || null, bio: restored.bio || "" });
          setSkills(restored.skills || []);
          setScreen("workerHome");
        } else {
          setScreen("onboarding");
        }
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = (message: string, icon: React.ReactNode = null) => setToast({ message, icon });

  const toggleDarkMode = (val: boolean) => {
    setIsDarkMode(val);
    if (typeof window !== "undefined") window.localStorage.setItem(THEME_STORAGE_KEY, val ? "dark" : "light");
  };

  const openJob = (job: any) => {
    setActiveJob(job);
    setScreen("jobDetail");
  };

  const openChat = (chat: any) => {
    setActiveChat(chat);
    setScreen("chatDetail");
  };

  const toggleFavorite = (jobId: number) => {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[jobId]) {
        delete next[jobId];
        showToast("Kaydedilenlerden çıkarıldı");
      } else {
        next[jobId] = true;
        showToast("İlan kaydedildi", <Heart size={14} color="#FFFFFF" fill="#FFFFFF" />);
      }
      return next;
    });
  };

  const messageEmployer = (job: any) => {
    const existing = MESSAGES.find((m) => m.name === job.company);
    const chat = existing || {
      id: `job-${job.id}`,
      name: job.company,
      initial: job.company.charAt(0),
      color: "#2563EB",
      preview: "",
      time: "",
    };
    openChat(chat);
  };

  const quickApply = (job: any) => {
    setActiveJob(job);
    setScreen("applicationSuccess");
    showToast("Başvurunuz gönderildi", <CheckCircle2 size={14} color="#FFFFFF" />);
  };

  const rateJob = (jobId: number, data: { rating: number; review: string }) => {
    setJobRatings((prev) => ({ ...prev, [jobId]: data }));
    showToast("Değerlendirmeniz kaydedildi", <Star size={14} color="#FFFFFF" fill="#FFFFFF" />);
  };

  const addSearchHistory = (q: string) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((x) => x.toLowerCase() !== q.toLowerCase());
      return [q, ...filtered].slice(0, 5);
    });
  };

  const addToCalendar = (item: any) => {
    showToast(`${item.title} takviminize eklendi!`, <CalendarPlus size={14} color="#FFFFFF" />);
  };

  const toggleSkill = (skill: string) => {
    setSkills((prev) => {
      const next = prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill];
      if (user.email) updateUserRecord(user.email, { skills: next });
      return next;
    });
  };

  const updateUser = (patch: Partial<typeof user>) => {
    setUser((prev) => {
      const next = { ...prev, ...patch };
      if (prev.email) {
        updateUserRecord(prev.email, next);
        if (next.email && next.email.toLowerCase() !== prev.email.toLowerCase()) {
          persistSession(next.email);
        }
      }
      return next;
    });
    showToast("Profil güncellendi", <CheckCircle2 size={14} color="#FFFFFF" />);
  };

  const handleAuthSuccess = (record: any) => {
    setUser({ name: record.name, email: record.email, phone: record.phone || "", avatar: record.avatar || null, bio: record.bio || "" });
    setSkills(record.skills || []);
    persistSession(record.email);
    setScreen("workerHome");
    showToast(`Hoş geldin, ${record.name.split(" ")[0]}!`, <CheckCircle2 size={14} color="#FFFFFF" />);
  };

  const changeAvatar = (base64: string) => {
    setUser((prev) => {
      const next = { ...prev, avatar: base64 };
      if (prev.email) updateUserRecord(prev.email, { avatar: base64 });
      return next;
    });
    showToast("Profil fotoğrafı güncellendi", <CheckCircle2 size={14} color="#FFFFFF" />);
  };

  const logout = () => {
    clearSession();
    setActiveJob(null);
    setActiveChat(null);
    setUser({ name: "", email: "", phone: "", avatar: null, bio: "" });
    setSkills([]);
    setScreen("login");
  };

  const navigate = (key: string) => {
    if (key === "home") setScreen("workerHome");
    if (key === "jobs") setScreen("applications");
    if (key === "chat") setScreen("messages");
    if (key === "alerts") setScreen("notifications");
    if (key === "profile") setScreen("profile");
  };

  const openSettingsItem = (key: string) => {
    const map: Record<string, string> = {
      edit: "settingsEditProfile",
      identity: "settingsIdentity",
      payment: "settingsPayment",
      language: "settingsLangNotif",
      notif: "settingsLangNotif",
      support: "settingsSupport",
    };
    if (map[key]) setScreen(map[key]);
  };

  const openNotification = (n: any) => {
    if (n.action?.type === "chat") {
      const chat = MESSAGES.find((m) => m.name === n.action.company);
      if (chat) {
        openChat(chat);
        return;
      }
    }
    if (n.action?.type === "applications") {
      setScreen("applications");
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center py-8 ${isDarkMode ? "dark" : ""}`}
      style={{ background: isDarkMode ? "#020617" : "#E2E8F0" }}
    >
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="relative overflow-hidden"
        style={{ width: 375, height: 812, borderRadius: 44, border: "10px solid #111827", boxShadow: "0 30px 60px rgba(0,0,0,0.35)", background: COLORS.bg }}
      >
        {screen === "splash" && <SplashScreen />}
        {screen === "onboarding" && <OnboardingScreen onStart={() => setScreen("userType")} />}
        {screen === "userType" && <UserTypeScreen onPickWorker={() => setScreen("login")} />}
        {screen === "login" && <LoginScreen onLogin={handleAuthSuccess} />}
        {screen === "workerHome" && (
          <WorkerHomeScreen
            user={user}
            onOpenJob={openJob}
            onNavigate={navigate}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onQuickApply={quickApply}
            searchHistory={searchHistory}
            onAddSearchHistory={addSearchHistory}
          />
        )}
        {screen === "jobDetail" && activeJob && (
          <JobDetailScreen job={activeJob} onBack={() => setScreen("workerHome")} onApply={() => setScreen("applicationSuccess")} onMessage={() => messageEmployer(activeJob)} />
        )}
        {screen === "applicationSuccess" && <ApplicationSuccessScreen onDone={() => setScreen("workerHome")} />}
        {screen === "messages" && <MessagesScreen onNavigate={navigate} onOpenChat={openChat} />}
        {screen === "chatDetail" && activeChat && <ChatDetailScreen chat={activeChat} onBack={() => setScreen("messages")} />}
        {screen === "notifications" && <NotificationsScreen onNavigate={navigate} onOpenNotification={openNotification} />}
        {screen === "applications" && (
          <ApplicationsScreen
            onNavigate={navigate}
            jobRatings={jobRatings}
            onRateJob={rateJob}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenJob={openJob}
            onQuickApply={quickApply}
            onAddToCalendar={addToCalendar}
          />
        )}
        {screen === "profile" && (
          <WorkerProfileScreen
            user={user}
            skills={skills}
            isNewUser={isNewUser}
            onChangeAvatar={changeAvatar}
            onNavigate={navigate}
            onOpenSettings={() => setScreen("settings")}
            onOpenWallet={() => setShowWallet(true)}
            completedJobsCount={isNewUser ? 0 : PAST_JOBS.length}
            showcasedBadgeIds={showcasedBadgeIds}
            onUpdateShowcase={(ids: number[]) => setShowcasedBadgeIds(ids)}
          />
        )}
        {screen === "settings" && (
          <SettingsScreen
            user={user}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            onBack={() => setScreen("profile")}
            onLogout={logout}
            onSelectItem={openSettingsItem}
          />
        )}
        {screen === "settingsEditProfile" && (
          <EditProfileScreen user={user} skills={skills} onToggleSkill={toggleSkill} onUpdateUser={updateUser} onChangeAvatar={changeAvatar} onBack={() => setScreen("settings")} />
        )}
        {screen === "settingsIdentity" && <IdentityVerificationScreen onBack={() => setScreen("settings")} />}
        {screen === "settingsPayment" && <PaymentMethodsScreen onBack={() => setScreen("settings")} />}
        {screen === "settingsLangNotif" && <LanguageNotificationScreen onBack={() => setScreen("settings")} />}
        {screen === "settingsSupport" && <SupportCenterScreen onBack={() => setScreen("settings")} />}

        {showWallet && <WalletModal onClose={() => setShowWallet(false)} showToast={showToast} />}

        <Toast toast={toast} />
      </div>
    </div>
  );
}