import React, { useState, useRef } from "react";
import {
  Sparkles, BookOpen, PenLine, ClipboardCheck, BarChart3, Users,
  CheckCircle2, Circle, Lightbulb, Award, Smile, Meh, Frown, ArrowRight,
  ArrowLeft, Star, ShieldCheck, GraduationCap, Menu, X, Volume2,
  ClipboardList, TrendingUp, Sprout, PartyPopper, Info
} from "lucide-react";

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
    .font-h { font-family: 'Poppins', sans-serif; }
    .font-b { font-family: 'Inter', sans-serif; }
  `}</style>
);

const COLORS = {
  primary: "#2563EB",
  secondary: "#10B981",
  accent: "#FBBF24",
  bg: "#F8FAFC",
};

function Wise({ mood = "hi", size = 40 }) {
  const faces = { hi: "🤖", good: "😊", think: "🤔", hint: "💡", yay: "🎉" };
  return (
    <div
      className="rounded-full flex items-center justify-center shadow-sm"
      style={{ width: size, height: size, background: "#EFF6FF", fontSize: size * 0.55 }}
    >
      {faces[mood] || "🤖"}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-[18px] shadow-sm p-5 ${className}`}>{children}</div>
  );
}

function PrimaryButton({ children, onClick, className = "", disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-h font-medium text-white rounded-[14px] px-5 py-3 transition active:scale-[0.98] disabled:opacity-50 ${className}`}
      style={{ background: COLORS.primary }}
    >
      {children}
    </button>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-b text-xs px-3 py-1.5 rounded-full border transition ${
        active ? "text-white border-transparent" : "text-slate-500 border-slate-200 bg-white"
      }`}
      style={active ? { background: COLORS.primary } : {}}
    >
      {children}
    </button>
  );
}

function ProgressBar({ label, value, color = COLORS.primary }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between font-b text-xs text-slate-500 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

function TopBar({ title, onBack, onMenu, roleLabel }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 sticky top-0 bg-white/90 backdrop-blur border-b border-slate-100 z-20">
      <div className="flex items-center gap-2">
        {onBack && (
          <button onClick={onBack} className="p-1.5 rounded-full hover:bg-slate-100">
            <ArrowLeft size={18} className="text-slate-500" />
          </button>
        )}
        <span className="font-h font-semibold text-slate-800 text-sm">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {roleLabel && (
          <span
            className="font-b text-[10px] px-2 py-1 rounded-full text-white"
            style={{ background: COLORS.secondary }}
          >
            {roleLabel}
          </span>
        )}
        {onMenu && (
          <button onClick={onMenu} className="p-1.5 rounded-full hover:bg-slate-100">
            <Menu size={18} className="text-slate-500" />
          </button>
        )}
      </div>
    </div>
  );
}

const STUDENT_NAV = [
  { key: "student-dashboard", label: "Dashboard", icon: GraduationCap },
  { key: "learn", label: "Learn", icon: BookOpen },
  { key: "writing", label: "Writing", icon: PenLine },
  { key: "portfolio", label: "Portfolio", icon: Award },
];

const TEACHER_NAV = [
  { key: "teacher-dashboard", label: "Dashboard", icon: Users },
  { key: "assignment", label: "Assignment", icon: ClipboardList },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

function BottomNav({ role, screen, go }) {
  const items = role === "teacher" ? TEACHER_NAV : STUDENT_NAV;
  return (
    <div className="sticky bottom-0 bg-white border-t border-slate-100 flex justify-around py-2 z-20">
      {items.map((it) => {
        const Icon = it.icon;
        const active = screen === it.key;
        return (
          <button
            key={it.key}
            onClick={() => go(it.key)}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <Icon size={18} color={active ? COLORS.primary : "#94A3B8"} />
            <span
              className="font-b text-[10px]"
              style={{ color: active ? COLORS.primary : "#94A3B8" }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------- SCREENS ----------------

function Splash({ go }) {
  return (
    <div
      className="h-full flex flex-col items-center justify-center gap-6 px-8 text-center"
      style={{ background: COLORS.bg }}
    >
      <Wise mood="hi" size={72} />
      <div>
        <h1 className="font-h font-extrabold text-2xl" style={{ color: COLORS.primary }}>
          WriteWise AI
        </h1>
        <p className="font-b text-slate-500 text-sm mt-1 italic">
          "AI that Teaches, Not Writes"
        </p>
      </div>
      <PrimaryButton onClick={() => go("login")} className="mt-4 w-full max-w-[240px]">
        Get Started
      </PrimaryButton>
    </div>
  );
}

function Login({ go, setRole }) {
  return (
    <div className="h-full flex flex-col justify-center px-6 gap-6" style={{ background: COLORS.bg }}>
      <div className="text-center">
        <h2 className="font-h font-bold text-lg text-slate-800">Welcome to WriteWise AI</h2>
        <p className="font-b text-sm text-slate-500">Choose your role to continue</p>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => { setRole("teacher"); go("teacher-dashboard"); }}
          className="bg-white rounded-[18px] p-4 flex items-center gap-3 shadow-sm text-left hover:shadow-md transition"
        >
          <div className="text-3xl">👩‍🏫</div>
          <div>
            <p className="font-h font-semibold text-slate-800 text-sm">Teacher</p>
            <p className="font-b text-xs text-slate-500">Manage your classroom</p>
          </div>
        </button>
        <button
          onClick={() => { setRole("student"); go("student-dashboard"); }}
          className="bg-white rounded-[18px] p-4 flex items-center gap-3 shadow-sm text-left hover:shadow-md transition"
        >
          <div className="text-3xl">👨‍🎓</div>
          <div>
            <p className="font-h font-semibold text-slate-800 text-sm">Student</p>
            <p className="font-b text-xs text-slate-500">Start your learning journey</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function StudentDashboard({ go }) {
  const goals = ["Identification", "Description", "Organization", "Vocabulary"];
  return (
    <div className="p-4 space-y-4">
      <div>
        <p className="font-b text-sm text-slate-500">Good morning,</p>
        <h2 className="font-h font-bold text-xl text-slate-800">Puti 🌸</h2>
      </div>

      <Card>
        <p className="font-b text-xs text-slate-400 mb-1">Today's Mission</p>
        <p className="font-h font-semibold text-slate-800">Write a Descriptive Text</p>
        <p className="font-b text-sm text-slate-500">Topic: Borobudur Temple</p>
      </Card>

      <Card>
        <p className="font-h font-semibold text-sm text-slate-700 mb-3">Today's Goal</p>
        {goals.map((g) => (
          <div key={g} className="flex items-center gap-2 py-1">
            <Circle size={16} className="text-slate-300" />
            <span className="font-b text-sm text-slate-600">{g}</span>
          </div>
        ))}
      </Card>

      <Card className="flex items-center gap-3">
        <Wise mood="hint" size={36} />
        <p className="font-b text-sm text-slate-600 italic">"Every great paragraph begins with a clear idea."</p>
      </Card>

      <PrimaryButton onClick={() => go("learn")} className="w-full flex items-center justify-center gap-2">
        Start Learning <ArrowRight size={16} />
      </PrimaryButton>
    </div>
  );
}

const VOCAB = [
  { word: "Majestic", meaning: "sangat indah & mengagumkan" },
  { word: "Ancient", meaning: "sangat tua / kuno" },
  { word: "Serene", meaning: "tenang dan damai" },
  { word: "Intricate", meaning: "rumit dan detail" },
];

function Learn({ go }) {
  const [flipped, setFlipped] = useState({});
  const [quizAnswer, setQuizAnswer] = useState(null);
  const correct = "identification-description";

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-h font-bold text-lg text-slate-800">Learn: Descriptive Text</h2>

      <Card>
        <p className="font-h font-semibold text-sm text-slate-700 mb-1">Definition</p>
        <p className="font-b text-sm text-slate-600">
          A descriptive text describes a particular person, place, or object in detail so
          the reader can imagine it clearly.
        </p>
      </Card>

      <div>
        <p className="font-h font-semibold text-sm text-slate-700 mb-2">Vocabulary Bank</p>
        <div className="grid grid-cols-2 gap-3">
          {VOCAB.map((v) => (
            <button
              key={v.word}
              onClick={() => setFlipped((f) => ({ ...f, [v.word]: !f[v.word] }))}
              className="bg-white rounded-[14px] p-3 h-20 shadow-sm flex items-center justify-center text-center"
            >
              <span className="font-b text-sm text-slate-700">
                {flipped[v.word] ? v.meaning : v.word}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Card>
        <p className="font-h font-semibold text-sm text-slate-700 mb-3">
          Mini Quiz — Generic Structure Order
        </p>
        {[
          { id: "identification-description", label: "Identification → Description" },
          { id: "description-identification", label: "Description → Identification" },
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => setQuizAnswer(opt.id)}
            className={`w-full text-left font-b text-sm rounded-[12px] p-3 mb-2 border ${
              quizAnswer === opt.id
                ? opt.id === correct
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-red-300 bg-red-50"
                : "border-slate-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
        {quizAnswer && (
          <p className="font-b text-xs mt-1" style={{ color: quizAnswer === correct ? COLORS.secondary : "#DC2626" }}>
            {quizAnswer === correct ? "🔥 Correct! Combo streak +1" : "Not quite — try again."}
          </p>
        )}
      </Card>

      <PrimaryButton onClick={() => go("planning")} className="w-full flex items-center justify-center gap-2">
        Continue to Planning <ArrowRight size={16} />
      </PrimaryButton>
    </div>
  );
}

const PLAN_QUESTIONS = [
  "Where is Borobudur located?",
  "What does it look like?",
  "What makes it unique?",
  "How do visitors feel there?",
];

function Planning({ go, planAnswers, setPlanAnswers }) {
  const update = (i, v) => {
    const next = [...planAnswers];
    next[i] = v;
    setPlanAnswers(next);
  };
  const filled = planAnswers.filter(Boolean).length;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Wise mood="good" size={36} />
        <p className="font-b text-sm text-slate-600">Let's organize your ideas! 🎯</p>
      </div>

      {PLAN_QUESTIONS.map((q, i) => (
        <Card key={q}>
          <p className="font-h font-semibold text-sm text-slate-700 mb-2">{q}</p>
          <textarea
            value={planAnswers[i] || ""}
            onChange={(e) => update(i, e.target.value)}
            rows={2}
            className="w-full font-b text-sm rounded-[10px] border border-slate-200 p-2 resize-none outline-none focus:border-blue-400"
            placeholder="Type your idea..."
          />
        </Card>
      ))}

      <Card className="bg-blue-50">
        <p className="font-h text-xs font-semibold text-slate-500 mb-1">Outline Preview</p>
        <p className="font-b text-sm text-slate-700">
          {planAnswers.filter(Boolean).join(" · ") || "Fill the questions above to build your outline..."}
        </p>
      </Card>

      <PrimaryButton
        onClick={() => go("writing")}
        disabled={filled < 2}
        className="w-full flex items-center justify-center gap-2"
      >
        Start Writing <ArrowRight size={16} />
      </PrimaryButton>
    </div>
  );
}

function WritingSpace({ go, planAnswers }) {
  const [text, setText] = useState("");
  const [hintLevel, setHintLevel] = useState(1);
  const [hint, setHint] = useState(null);
  const [why, setWhy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pasteWarning, setPasteWarning] = useState(false);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const handlePaste = (e) => {
    e.preventDefault();
    setPasteWarning(true);
    setTimeout(() => setPasteWarning(false), 2500);
  };

  const askWise = async () => {
    setLoading(true);
    setHint(null);
    try {
      const prompt = `You are "Wise", a friendly AI writing mentor inside an English-learning app called WriteWise AI for Indonesian senior high school students (Fase E). A student is writing a descriptive text about "Borobudur Temple". 

Their planning notes: ${planAnswers.filter(Boolean).join(" | ") || "(not filled yet)"}
Their current draft so far: "${text || "(empty)"}"

Today's learning objective focus is: Organization (paragraph structure, topic sentence, coherence).
Hint level requested: ${hintLevel} (1 = a gentle guiding question, 2 = a more direct pointer, 3 = an example sentence structure WITHOUT giving the actual content/answer).

STRICT RULES: Never write or rewrite their essay for them. Never give a ready-made sentence they can copy directly into their essay content. Only give a short scaffolding hint (max 2 sentences) that helps them think, appropriate to hint level ${hintLevel}.

Respond ONLY with strict JSON, no markdown fences, in this exact shape:
{"hint": "...", "why": "..."}
where "why" is one short sentence explaining why this hint was given, referencing today's objective (Organization).`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 300,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const raw = (data.content || []).map((b) => b.text || "").join("");
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setHint(parsed);
    } catch (err) {
      setHint({
        hint: "Coba baca ulang topic sentence-mu — apakah sudah menyebutkan apa yang akan kamu deskripsikan?",
        why: "Hint cadangan ditampilkan karena koneksi ke AI gagal.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <p className="font-h font-semibold text-xs text-slate-500 mb-2">Today's Goal</p>
        <ProgressBar label="Organization" value={Math.min(90, wordCount * 3)} color={COLORS.primary} />
        <ProgressBar label="Vocabulary" value={Math.min(85, wordCount * 2.5)} color={COLORS.secondary} />
        <ProgressBar label="Grammar" value={Math.min(80, wordCount * 2)} color={COLORS.accent} />
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <p className="font-h font-semibold text-sm text-slate-700">Writing Editor</p>
          <span className="font-b text-xs text-slate-400">{wordCount} / 150 words</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPaste={handlePaste}
          rows={7}
          placeholder="Start writing your descriptive text about Borobudur Temple..."
          className="w-full font-b text-sm rounded-[12px] border border-slate-200 p-3 resize-none outline-none focus:border-blue-400"
        />
        {pasteWarning && (
          <p className="font-b text-xs text-amber-600 mt-1 flex items-center gap-1">
            <ShieldCheck size={12} /> Paste dinonaktifkan untuk menjaga keaslian tulisanmu 😊
          </p>
        )}
      </Card>

      <Card className="border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <Wise mood={loading ? "think" : "hint"} size={32} />
          <p className="font-h font-semibold text-sm text-slate-700">Wise AI Companion</p>
        </div>

        <div className="flex gap-2 mb-3">
          {[1, 2, 3].map((lvl) => (
            <Pill key={lvl} active={hintLevel === lvl} onClick={() => setHintLevel(lvl)}>
              Level {lvl}
            </Pill>
          ))}
        </div>

        <PrimaryButton onClick={askWise} disabled={loading} className="w-full text-sm">
          {loading ? "Wise is thinking..." : "Get a Hint 💡"}
        </PrimaryButton>

        {hint && (
          <div className="mt-3 bg-amber-50 rounded-[12px] p-3">
            <p className="font-b text-sm text-slate-700">💡 {hint.hint}</p>
            <button
              onClick={() => setWhy((w) => !w)}
              className="font-b text-xs text-blue-600 mt-2 flex items-center gap-1"
            >
              <Info size={12} /> Why this hint?
            </button>
            {why && <p className="font-b text-xs text-slate-500 mt-1 italic">{hint.why}</p>}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="font-h text-xs font-semibold text-slate-500 mb-2">AI Principles</p>
          <ul className="font-b text-xs text-slate-500 space-y-1">
            <li>✓ Gives hints, never full answers</li>
            <li>✓ Supports your thinking process</li>
            <li>✓ Never writes your essay</li>
            <li>✓ Never replaces your teacher</li>
          </ul>
        </div>
      </Card>

      <PrimaryButton onClick={() => go("reflection")} className="w-full flex items-center justify-center gap-2">
        Submit Draft <ArrowRight size={16} />
      </PrimaryButton>
    </div>
  );
}

function Reflection({ go }) {
  const [checked, setChecked] = useState({});
  const [mood, setMood] = useState(null);
  const [rating, setRating] = useState(0);
  const items = ["Identification", "Description", "Organization", "Grammar"];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Wise mood="yay" size={36} />
        <p className="font-b text-sm text-slate-600">Great effort today! 🎉</p>
      </div>

      <Card>
        <p className="font-h font-semibold text-sm text-slate-700 mb-2">Goal Achievement</p>
        {items.map((it) => (
          <button
            key={it}
            onClick={() => setChecked((c) => ({ ...c, [it]: !c[it] }))}
            className="w-full flex items-center gap-2 py-1.5"
          >
            {checked[it] ? (
              <CheckCircle2 size={18} style={{ color: COLORS.secondary }} />
            ) : (
              <Circle size={18} className="text-slate-300" />
            )}
            <span className="font-b text-sm text-slate-600">{it}</span>
          </button>
        ))}
      </Card>

      <Card>
        <p className="font-h font-semibold text-sm text-slate-700 mb-2">How do you feel today?</p>
        <div className="flex gap-3">
          {[
            { k: "confident", icon: Smile, label: "Confident" },
            { k: "okay", icon: Meh, label: "Okay" },
            { k: "help", icon: Frown, label: "Need Help" },
          ].map(({ k, icon: Icon, label }) => (
            <button
              key={k}
              onClick={() => setMood(k)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-[12px] border ${
                mood === k ? "border-blue-400 bg-blue-50" : "border-slate-200"
              }`}
            >
              <Icon size={20} className="text-slate-500" />
              <span className="font-b text-[10px] text-slate-500">{label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <p className="font-h font-semibold text-sm text-slate-700 mb-2">Was Wise's hint helpful?</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setRating(s)}>
              <Star
                size={22}
                fill={s <= rating ? COLORS.accent : "none"}
                color={s <= rating ? COLORS.accent : "#CBD5E1"}
              />
            </button>
          ))}
        </div>
      </Card>

      <PrimaryButton onClick={() => go("portfolio")} className="w-full flex items-center justify-center gap-2">
        Submit Reflection <ArrowRight size={16} />
      </PrimaryButton>
    </div>
  );
}

function Portfolio() {
  const badges = ["Revision Explorer", "Grammar Builder", "Reflection Master", "Idea Developer"];
  return (
    <div className="p-4 space-y-4">
      <h2 className="font-h font-bold text-lg text-slate-800">Your Growth Journey</h2>

      <Card>
        <div className="flex items-center justify-between font-b text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1"><Sprout size={14} /> First Draft</span>
          <span>→</span>
          <span>AI Hint</span>
          <span>→</span>
          <span>Revision</span>
          <span>→</span>
          <span className="flex items-center gap-1"><TrendingUp size={14} /> Final Draft</span>
        </div>
        <ProgressBar label="Organization" value={90} color={COLORS.primary} />
        <ProgressBar label="Grammar" value={84} color={COLORS.secondary} />
        <ProgressBar label="Vocabulary" value={92} color={COLORS.accent} />
        <p className="font-b text-xs text-slate-400 mt-1">Before → After (this semester)</p>
      </Card>

      <div>
        <p className="font-h font-semibold text-sm text-slate-700 mb-2">Achievements</p>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((b) => (
            <Card key={b} className="flex flex-col items-center text-center py-4">
              <Award size={22} style={{ color: COLORS.accent }} />
              <span className="font-b text-xs text-slate-600 mt-1">{b}</span>
            </Card>
          ))}
        </div>
      </div>

      <Card className="flex items-center gap-3 bg-emerald-50">
        <PartyPopper size={22} style={{ color: COLORS.secondary }} />
        <p className="font-b text-sm text-slate-600">
          Your Organization skill improved by <b>18%</b> this month!
        </p>
      </Card>
    </div>
  );
}

function TeacherDashboard({ go }) {
  return (
    <div className="p-4 space-y-4">
      <div>
        <p className="font-b text-sm text-slate-500">Good morning,</p>
        <h2 className="font-h font-bold text-xl text-slate-800">Ms. Sarah 🌸</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="font-b text-xs text-slate-400">Today's Class</p>
          <p className="font-h font-bold text-lg text-slate-800">36 Students</p>
        </Card>
        <Card>
          <p className="font-b text-xs text-slate-400">Status</p>
          <p className="font-b text-xs text-slate-600">🟢 18 · 🟡 12 · 🔴 6</p>
        </Card>
      </div>

      <Card>
        <p className="font-h font-semibold text-sm text-slate-700 mb-2">Most Common Difficulties</p>
        {[
          { l: "Grammar", v: 78 },
          { l: "Organization", v: 68 },
          { l: "Vocabulary", v: 45 },
          { l: "Ideas", v: 30 },
        ].map((d) => (
          <ProgressBar key={d.l} label={d.l} value={d.v} color={COLORS.primary} />
        ))}
      </Card>

      <Card className="border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <Wise mood="hint" size={30} />
          <p className="font-h font-semibold text-sm text-slate-700">AI Teaching Copilot</p>
        </div>
        <p className="font-b text-sm text-slate-600">
          68% of students still struggle with paragraph organization. Recommended: a Paragraph
          Ordering Activity before the next lesson (≈20 minutes, Worksheet A).
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <PrimaryButton onClick={() => go("assignment")} className="text-sm">
          + New Assignment
        </PrimaryButton>
        <button
          onClick={() => go("analytics")}
          className="font-h font-medium text-sm rounded-[14px] px-4 py-3 border"
          style={{ borderColor: COLORS.primary, color: COLORS.primary }}
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

function Assignment({ go }) {
  const [focus, setFocus] = useState({ Organization: true, Vocabulary: true });
  const [rubric, setRubric] = useState({ Organization: 40, Grammar: 25, Vocabulary: 20, Mechanics: 15 });
  const [published, setPublished] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-h font-bold text-lg text-slate-800">Create Assignment</h2>

      <Card>
        <p className="font-h font-semibold text-xs text-slate-500 mb-2">Assignment Info</p>
        <input className="w-full font-b text-sm border border-slate-200 rounded-[10px] p-2 mb-2" placeholder="Title (e.g. Writing a Descriptive Text)" defaultValue="Writing a Descriptive Text" />
        <input className="w-full font-b text-sm border border-slate-200 rounded-[10px] p-2 mb-2" placeholder="Topic" defaultValue="Borobudur Temple" />
        <input className="w-full font-b text-sm border border-slate-200 rounded-[10px] p-2" placeholder="Word Count" defaultValue="150 words" />
      </Card>

      <Card>
        <p className="font-h font-semibold text-xs text-slate-500 mb-2">Assessment Rubric</p>
        {Object.entries(rubric).map(([k, v]) => (
          <div key={k} className="mb-2">
            <div className="flex justify-between font-b text-xs text-slate-500">
              <span>{k}</span><span>{v}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={v}
              onChange={(e) => setRubric((r) => ({ ...r, [k]: Number(e.target.value) }))}
              className="w-full accent-blue-600"
            />
          </div>
        ))}
      </Card>

      <Card>
        <p className="font-h font-semibold text-xs text-slate-500 mb-2">AI Focus</p>
        <div className="flex flex-wrap gap-2">
          {["Organization", "Grammar", "Vocabulary", "Ideas"].map((f) => (
            <Pill key={f} active={!!focus[f]} onClick={() => setFocus((s) => ({ ...s, [f]: !s[f] }))}>
              {f}
            </Pill>
          ))}
        </div>
      </Card>

      <PrimaryButton onClick={() => setPublished(true)} className="w-full">
        Publish Assignment
      </PrimaryButton>
      {published && (
        <Card className="bg-emerald-50 text-center">
          <p className="font-b text-sm text-emerald-700">✅ Assignment published to 36 students</p>
        </Card>
      )}
    </div>
  );
}

function Analytics() {
  const rows = [
    { l: "Organization", before: 62, after: 89 },
    { l: "Grammar", before: 70, after: 85 },
    { l: "Vocabulary", before: 65, after: 80 },
  ];
  return (
    <div className="p-4 space-y-4">
      <h2 className="font-h font-bold text-lg text-slate-800">Class Analytics</h2>
      <Card>
        <p className="font-h font-semibold text-sm text-slate-700 mb-3">Before vs After</p>
        {rows.map((r) => (
          <div key={r.l} className="mb-3">
            <p className="font-b text-xs text-slate-500 mb-1">{r.l}</p>
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <ProgressBar label="Before" value={r.before} color="#CBD5E1" />
              </div>
            </div>
            <ProgressBar label="After" value={r.after} color={COLORS.secondary} />
          </div>
        ))}
      </Card>

      <Card className="border border-blue-100">
        <p className="font-h font-semibold text-sm text-slate-700 mb-1">Class Insight</p>
        <p className="font-b text-sm text-slate-600">
          Students improved significantly in Vocabulary. Organization remains the biggest
          challenge. Recommendation: use collaborative paragraph planning next week.
        </p>
      </Card>

      <Card>
        <p className="font-h font-semibold text-sm text-slate-700 mb-2">Suggested Activities</p>
        <div className="flex flex-wrap gap-2">
          {["Paragraph Ordering", "Sentence Combining", "Peer Review"].map((a) => (
            <span key={a} className="font-b text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
              {a}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ---------------- APP ----------------

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [planAnswers, setPlanAnswers] = useState(["", "", "", ""]);

  const go = (s) => { setScreen(s); setMenuOpen(false); };

  const titles = {
    "student-dashboard": "Dashboard", learn: "Learn", planning: "Planning Board",
    writing: "Writing Space", reflection: "Reflection", portfolio: "Portfolio",
    "teacher-dashboard": "Dashboard", assignment: "Create Assignment", analytics: "Analytics",
  };

  const showChrome = screen !== "splash" && screen !== "login";
  const showBottomNav = role && ["student-dashboard","learn","planning","writing","reflection","portfolio","teacher-dashboard","assignment","analytics"].includes(screen);

  return (
    <div
      className="font-b w-full max-w-[420px] mx-auto h-[850px] flex flex-col rounded-[24px] overflow-hidden border border-slate-200 shadow-xl"
      style={{ background: COLORS.bg }}
    >
      {FONTS}

      {showChrome && (
        <TopBar
          title={titles[screen] || "WriteWise AI"}
          onBack={screen !== "student-dashboard" && screen !== "teacher-dashboard" ? () => window.history.length && go(role === "teacher" ? "teacher-dashboard" : "student-dashboard") : null}
          onMenu={() => setMenuOpen((m) => !m)}
          roleLabel={role === "teacher" ? "Teacher Mode" : role === "student" ? "Student Mode" : null}
        />
      )}

      {menuOpen && (
        <div className="absolute right-4 top-14 bg-white shadow-lg rounded-[14px] p-2 z-30 w-48">
          <button onClick={() => go("login")} className="w-full text-left font-b text-sm px-3 py-2 rounded-[10px] hover:bg-slate-50">
            Switch Role
          </button>
          {(role === "teacher" ? TEACHER_NAV : STUDENT_NAV).map((it) => (
            <button
              key={it.key}
              onClick={() => go(it.key)}
              className="w-full text-left font-b text-sm px-3 py-2 rounded-[10px] hover:bg-slate-50"
            >
              {it.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {screen === "splash" && <Splash go={go} />}
        {screen === "login" && <Login go={go} setRole={setRole} />}
        {screen === "student-dashboard" && <StudentDashboard go={go} />}
        {screen === "learn" && <Learn go={go} />}
        {screen === "planning" && <Planning go={go} planAnswers={planAnswers} setPlanAnswers={setPlanAnswers} />}
        {screen === "writing" && <WritingSpace go={go} planAnswers={planAnswers} />}
        {screen === "reflection" && <Reflection go={go} />}
        {screen === "portfolio" && <Portfolio />}
        {screen === "teacher-dashboard" && <TeacherDashboard go={go} />}
        {screen === "assignment" && <Assignment go={go} />}
        {screen === "analytics" && <Analytics />}
      </div>

      {showBottomNav && <BottomNav role={role} screen={screen} go={go} />}
    </div>
  );
}
