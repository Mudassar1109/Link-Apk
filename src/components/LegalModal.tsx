import React from 'react';

interface LegalModalProps {
  pageId: string;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ pageId, onClose }) => {
  const renderContent = () => {
    switch (pageId) {
      case 'about':
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172033] mb-4">About LinkDit Apk</h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              <strong>LinkDit Apk</strong> is an authoritative, independent discovery catalog for Android applications, mobile utilities, and games.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              Our platform was created to provide a clean, uncluttered, and trustworthy alternative to traditional APK repositories. We believe users deserve complete clarity on where their software originates.
            </p>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mt-4 mb-2">Our Operating Philosophy</h2>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 space-y-1.5 mb-4">
              <li><strong>Zero Repackaging:</strong> We never recompile, alter, or inject third-party ad networks into application packages.</li>
              <li><strong>Official Distribution:</strong> All download buttons direct visitors directly to official developer repositories (such as GitHub, F-Droid, or Google Play).</li>
              <li><strong>No Fabricated Ratings:</strong> We never display fake 5-star ratings or made-up download counts. Metadata is derived from factual package declarations.</li>
            </ul>
          </>
        );

      case 'editorial':
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172033] mb-4">Editorial Policy &amp; Standards</h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              LinkDit Apk maintains strict editorial autonomy. Our software selections and reviews are produced by technical editors with experience in Android systems and open-source software.
            </p>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mt-4 mb-2">Inclusion Criteria</h2>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 space-y-1.5 mb-4">
              <li>Apps must possess an identifiable developer or active open-source maintainer community.</li>
              <li>Apps must not engage in deceptive background battery harvesting or undisclosed telemetry.</li>
              <li>Open-source software must have verifiable source code accessible in public repositories.</li>
            </ul>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mt-4 mb-2">Commercial Independence</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              We do not accept sponsorship payments in exchange for featured placements or artificially positive reviews. All listings marked &quot;Featured Pick&quot; are selected purely on technical merit and user utility.
            </p>
          </>
        );

      case 'privacy':
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172033] mb-4">Privacy Policy</h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              Last updated: October 2026. Your privacy is paramount at LinkDit Apk.
            </p>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mt-4 mb-2">Information We Do NOT Collect</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              We do not require user accounts to browse, search, or access official download links. We do not collect your personal name, phone number, address, or payment details.
            </p>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mt-4 mb-2">Cookies &amp; Local Storage</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              LinkDit Apk does not use marketing or cross-site tracking cookies. We utilize browser <code>localStorage</code> strictly to remember administrative preferences and local demo changes.
            </p>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mt-4 mb-2">Analytics (GA4 / GTM / Cloudflare)</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              If enabled by the site operator, aggregated traffic telemetry may be processed using Google Analytics 4 (GA4) or Cloudflare Real User Monitoring (RUM). IP addresses are anonymized and no Personally Identifiable Information (PII) is transmitted.
            </p>
          </>
        );

      case 'terms':
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172033] mb-4">Terms of Use</h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              By accessing LinkDit Apk, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mt-4 mb-2">Acceptable Use</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              LinkDit Apk is provided for discovery and educational purposes. You agree not to use automated scraping bots in a manner that degrades service availability or infringes on trademark ownership.
            </p>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider mt-4 mb-2">Third-Party Software</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              All applications and games referenced on LinkDit Apk remain the intellectual property of their respective developers and copyright holders. Software installations are governed by the license agreements specified by the original authors.
            </p>
          </>
        );

      case 'disclaimer':
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172033] mb-4">Disclaimer</h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              <strong>Trademark Notice:</strong> Android, Google Play, and the Google Play logo are trademarks of Google LLC. LinkDit Apk is an independent website and is not affiliated with, authorized, maintained, sponsored, or endorsed by Google LLC.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              <strong>External Links:</strong> LinkDit Apk provides outbound links to third-party developer websites, GitHub repositories, and Google Play Store pages. While we review links for authenticity at the time of publication, we do not control third-party servers and cannot be held liable for external service changes.
            </p>
          </>
        );

      case 'contact':
      default:
        return (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172033] mb-4">Contact &amp; DMCA Enquiries</h1>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
              For editorial enquiries, developer submissions, or DMCA copyright notifications, please reach out directly:
            </p>
            <div className="bg-[#f5f7f9] p-4 rounded-xl border border-[#e5eaf0] my-4 text-xs sm:text-sm space-y-2">
              <p><strong>Editorial &amp; Submissions:</strong> editorial@linkditapk.com</p>
              <p><strong>Legal &amp; Copyright:</strong> dmca@linkditapk.com</p>
              <p><strong>Response SLA:</strong> Within 48 business hours</p>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you are a copyright owner and wish to request the removal or update of an app entry, please specify the exact listing URL and evidence of authorized ownership.
            </p>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e5eaf0] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f5f7f9] hover:bg-[#e5eaf0] text-[#172033] border border-[#e5eaf0] flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <i className="fa-solid fa-xmark text-xs"></i>
        </button>

        <div className="max-h-[75vh] overflow-y-auto pr-2">
          {renderContent()}
        </div>

        <div className="mt-6 pt-4 border-t border-[#e5eaf0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2fa5bd] hover:bg-[#23869b] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
