"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Mail, CheckCircle2, AlertCircle } from "lucide-react";

const SINGLE_ITEMS = [
  { value: "post",            label: "Post",            price: "LKR 1,500" },
  { value: "reel",            label: "Reel",            price: "LKR 2,500" },
  { value: "podcast",         label: "Podcast",         price: "LKR 14,500" },
  { value: "motion_graphics", label: "Motion Graphics", price: "LKR 6,500" },
  { value: "cv_resume",       label: "CV / Resume",     price: "LKR 2,000" },
];

const MONTHLY_PACKAGES = [
  {
    value: "post_package",
    label: "Post Package",
    tag: "POST",
    price: "LKR 15,000/mo",
    description: "10 posts per month",
  },
  {
    value: "reels_package",
    label: "Reels Package",
    tag: "REELS",
    price: "LKR 30,000/mo",
    description: "15 reels per month",
  },
  {
    value: "combo_package",
    label: "Reels + Posts Combo",
    tag: "COMBO",
    price: "LKR 40,000/mo",
    description: "15 reels & 10 posts",
    popular: true,
  },
  {
    value: "podcast_package",
    label: "Podcast Package",
    tag: "PODCAST",
    price: "LKR 27,500/mo",
    description: "1 podcast + 10 reels",
  },
];

type OrderType = "single" | "monthly" | "custom" | "";
type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  orderType: OrderType;
  singleItems: string[];
  monthlyPackage: string;
  customDescription: string;
  notes: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  orderType: "",
  singleItems: [],
  monthlyPackage: "",
  customDescription: "",
  notes: "",
};

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Spinner component ──────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2.5"
      />
      <path
        d="M18 10a8 8 0 0 0-8-8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProjectForm({ isOpen, onClose }: ProjectFormProps) {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormData(EMPTY_FORM);
      setStatus("idle");
    }, 300);
  };

  const toggleSingleItem = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      singleItems: prev.singleItems.includes(value)
        ? prev.singleItems.filter((i) => i !== value)
        : [...prev.singleItems, value],
    }));
  };

  const isValid = () => {
    if (!formData.name || !formData.email || !formData.orderType) return false;
    if (formData.orderType === "single" && formData.singleItems.length === 0) return false;
    if (formData.orderType === "monthly" && !formData.monthlyPackage) return false;
    if (formData.orderType === "custom" && !formData.customDescription.trim()) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    setStatus("loading");

    try {
      const payload = {
        ...formData,
        singleItems: formData.singleItems.join(", "),
      };

      await fetch(
        "https://script.google.com/macros/s/AKfycbw2Oztz4oXiLaI_lC4gybovkCco8ag5MR17tX1OWViRfUzFk_-wtsgRH9SV19c7VZ2p/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      setStatus("success");
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full max-w-xl bg-white rounded-[2rem] shadow-2xl max-h-[92vh] overflow-y-auto hide-scrollbar pointer-events-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white rounded-t-[2rem] z-10 flex justify-between items-center px-8 pt-8 pb-4 border-b border-neutral-100">
                <div>
                  <h2 className="text-2xl font-display font-bold tracking-tight">
                    Start a Project
                  </h2>
                  <p className="text-sm text-neutral-400 mt-0.5">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* ── Success state ─────────────────────────────────────────── */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 24, stiffness: 280 }}
                    className="flex flex-col items-center justify-center px-8 py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 16, stiffness: 260, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 size={36} className="text-white" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-display font-bold tracking-tight mb-2"
                    >
                      Order received!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                      className="text-neutral-400 text-sm max-w-xs leading-relaxed mb-8"
                    >
                      Thanks for reaching out. We&apos;ll review your request and get
                      back to you within 24 hours.
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.34 }}
                      onClick={handleClose}
                      className="px-8 py-3 bg-black text-white rounded-full font-semibold text-sm hover:bg-neutral-800 transition-colors"
                    >
                      Done
                    </motion.button>
                  </motion.div>
                ) : (

                  /* ── Form state ─────────────────────────────────────────── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="px-8 pt-6 pb-8 space-y-6"
                    exit={{ opacity: 0 }}
                  >

                    {/* Contact details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                          Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
                          Phone <span className="text-neutral-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm"
                          placeholder="+94 76 000 0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    {/* Order type */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        What are you looking for? <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["single", "monthly", "custom"] as OrderType[]).map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() =>
                              setFormData((p) => ({
                                ...p,
                                orderType: type,
                                singleItems: [],
                                monthlyPackage: "",
                              }))
                            }
                            className={`py-3 px-2 rounded-xl text-sm font-medium border transition-all duration-200
                              ${formData.orderType === type
                                ? "bg-black text-white border-black"
                                : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400"
                              }`}
                          >
                            {type === "single" ? "Single Item" : type === "monthly" ? "Monthly Plan" : "Custom"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Single item picker */}
                    <AnimatePresence>
                      {formData.orderType === "single" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <label className="block text-sm font-medium text-neutral-700 mb-3">
                            Select content type(s) <span className="text-red-400">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {SINGLE_ITEMS.map((item) => {
                              const selected = formData.singleItems.includes(item.value);
                              return (
                                <button
                                  type="button"
                                  key={item.value}
                                  onClick={() => toggleSingleItem(item.value)}
                                  className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all duration-200
                                    ${selected
                                      ? "bg-black text-white border-black"
                                      : "bg-neutral-50 border-neutral-200 hover:border-neutral-400"
                                    }`}
                                >
                                  <span className={`text-xs font-semibold mb-1 ${selected ? "text-white/60" : "text-neutral-400"}`}>
                                    {item.price}
                                  </span>
                                  <span className={`text-sm font-medium ${selected ? "text-white" : "text-neutral-800"}`}>
                                    {item.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Monthly package picker */}
                    <AnimatePresence>
                      {formData.orderType === "monthly" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <label className="block text-sm font-medium text-neutral-700 mb-3">
                            Choose a package <span className="text-red-400">*</span>
                          </label>
                          <div className="flex flex-col gap-2">
                            {MONTHLY_PACKAGES.map((pkg) => {
                              const selected = formData.monthlyPackage === pkg.value;
                              return (
                                <button
                                  type="button"
                                  key={pkg.value}
                                  onClick={() => setFormData((p) => ({ ...p, monthlyPackage: pkg.value }))}
                                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200
                                    ${selected
                                      ? "bg-black text-white border-black"
                                      : "bg-neutral-50 border-neutral-200 hover:border-neutral-400"
                                    }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                                      ${selected ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-500"}`}>
                                      {pkg.tag}
                                    </span>
                                    <div>
                                      <div className={`text-sm font-semibold flex items-center gap-2 ${selected ? "text-white" : "text-neutral-800"}`}>
                                        {pkg.label}
                                        {pkg.popular && (
                                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full
                                            ${selected ? "bg-white/20 text-white" : "bg-neutral-900 text-white"}`}>
                                            <Sparkles size={9} /> Popular
                                          </span>
                                        )}
                                      </div>
                                      <div className={`text-xs mt-0.5 ${selected ? "text-white/60" : "text-neutral-400"}`}>
                                        {pkg.description}
                                      </div>
                                    </div>
                                  </div>
                                  <span className={`text-sm font-bold shrink-0 ml-4 ${selected ? "text-white" : "text-neutral-900"}`}>
                                    {pkg.price}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Custom package */}
                    <AnimatePresence>
                      {formData.orderType === "custom" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 mb-4">
                            <p className="text-sm text-neutral-500">
                              Need something specific? Describe what you&apos;re looking for and
                              we&apos;ll put together a tailored quote just for you.
                            </p>
                          </div>
                          <label htmlFor="customDescription" className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Describe your custom package <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            id="customDescription"
                            rows={4}
                            value={formData.customDescription}
                            onChange={(e) => setFormData((p) => ({ ...p, customDescription: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none text-sm"
                            placeholder="e.g. I need 5 reels + 8 posts + 1 podcast per month..."
                            required={formData.orderType === "custom"}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Additional notes */}
                    <AnimatePresence>
                      {formData.orderType && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Additional notes{" "}
                            <span className="text-neutral-400 font-normal">(optional)</span>
                          </label>
                          <textarea
                            id="notes"
                            rows={2}
                            value={formData.notes}
                            onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none text-sm"
                            placeholder="Deadlines, references, brand guidelines..."
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Error message */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm"
                        >
                          <AlertCircle size={16} className="shrink-0" />
                          <span>Something went wrong. Please try again.</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!isValid() || status === "loading"}
                      className="w-full py-4 bg-black text-white rounded-full font-semibold text-base hover:bg-neutral-800 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Spinner />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <Mail size={18} />
                          <span>Place your order</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-neutral-400 leading-relaxed">
                      By submitting, your details will be sent to{" "}
                      <span className="text-neutral-600 font-medium">pixelencecreations@gmail.com</span>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}