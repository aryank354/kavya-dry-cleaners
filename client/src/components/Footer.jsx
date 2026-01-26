const Footer = ({ onRequestCallback }) => {
  return (
    <footer className="bg-slate-900 text-white py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
        
        {/* Brand Info */}
        <div>
          <h4 className="text-xl font-bold mb-4">Kavya Dry Cleaners</h4>
          <p className="text-slate-400">Premium care for your premium clothes since 2001. Trusted by thousands in New Delhi.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-slate-400">
            <li>D-313, Tagore Garden Extn</li>
            <li>New Delhi - 110027</li>
            <li>Mob: 9899320667</li>
          </ul>
        </div>

        {/* Action & Copyright */}
        <div>
          <button onClick={onRequestCallback} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold mb-6 transition-all active:scale-95">
            Request Call Back
          </button>
          
          <div className="text-center space-y-2">
            <p className="text-xs text-slate-500">© 2026 Kavya Dry Cleaners</p>
            
            {/* --- DEVELOPER INFO ADDED HERE --- */}
            <p className="text-[10px] text-slate-600">
              Developed by <a href="https://www.aryankanojia.live/" className="hover:text-slate-400 underline decoration-slate-700">Aryan Kanojia</a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;