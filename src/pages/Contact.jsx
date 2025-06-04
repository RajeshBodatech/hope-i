import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  {
    title: 'Admin',
    img: '/images/img2.png',
    value: 'admin',
  },
  {
    title: 'User',
    img: '/images/img.png',
    value: 'user',
  },
  {
    title: 'Doctor',
    img: '/images/doctor.jpg',
    value: 'doctor',
  },
];

const logo = '/images/logo.jpg';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.85, y: 40, transition: { duration: 0.2 } },
};

const Contact = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    otp: '',
    password: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpValid, setOtpValid] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Simulate OTP for demo
  const generatedOtp = '123456';

  const openModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
    setFormData({ fullname: '', email: '', phone: '', otp: '', password: '' });
    setOtpSent(false);
    setOtpValid(false);
    setOtpError('');
    setPhoneError('');
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRole(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'phone') setPhoneError('');
    if (name === 'otp') setOtpError('');
  };

  const validatePhone = (phone) => {
    // Simple validation: 10 digits, starts with 6-9 (for India), adjust as needed
    return /^[6-9]\d{9}$/.test(phone);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return;
    }
    setOtpSent(true);
    setOtpError('');
    // In real app, send OTP here
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (formData.otp === generatedOtp) {
      setOtpValid(true);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP. Please try again.');
      setOtpValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpValid) {
      setOtpError('Please verify OTP before signing up.');
      return;
    }
    alert(
      `Signed up as ${selectedRole.title}\nName: ${formData.fullname}\nEmail: ${formData.email}\nPhone: ${formData.phone}`
    );
    closeModal();
  };

  return (
    <div className="mt-20 px-2 min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up As</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {roles.map((role) => (
          <motion.button
            key={role.value}
            onClick={() => openModal(role)}
            className="flex flex-col items-center bg-white rounded-xl shadow-md px-6 py-4 hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-green-400 focus:outline-none hover:scale-105 duration-300"
            whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(34,197,94,0.15)' }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={role.img}
              alt={role.title}
              className="w-12 h-12 rounded-full mb-2 object-cover shadow"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <span className="font-semibold text-gray-700">{role.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px] bg-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-4 w-full max-w-xs relative animate-fadeIn scale-95 animate-[bounce_0.5s] border border-gray-200"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500 font-bold focus:outline-none transition-colors"
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex flex-col items-center mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <img src={logo} alt="Logo" className="w-8 h-8 object-contain drop-shadow" />
                  <h1 className="text-xl font-bold text-green-700 drop-shadow">HOPE I</h1>
                </div>
                <p className="text-xs text-gray-500 font-semibold">Mental Health AI Chat Bot</p>
              </div>
              <motion.h2
                className="text-lg font-bold text-gray-800 mb-2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Sign Up
              </motion.h2>
              <motion.p
                className="text-sm font-semibold text-green-700 mb-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedRole.title}
              </motion.p>
              <motion.img
                src={selectedRole.img}
                alt={selectedRole.title}
                className="w-14 h-12 mb-3 rounded-xl object-cover mx-auto shadow border border-green-100"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35 }}
              />
              <form className="w-full" onSubmit={handleSubmit}>
                <motion.div
                  className="mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400 text-sm shadow"
                    required
                  />
                </motion.div>
                <motion.div
                  className="mb-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400 text-sm shadow"
                    required
                  />
                </motion.div>
                <motion.div
                  className="mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400 text-sm shadow"
                    required
                  />
                </motion.div>
                <motion.div
                  className="mb-2 flex gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400 text-sm shadow`}
                    required
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="bg-green-500 text-white px-3 py-2 rounded font-semibold text-xs hover:bg-green-600 transition duration-200 shadow"
                    disabled={otpSent}
                  >
                    {otpSent ? 'Sent' : 'Send OTP'}
                  </button>
                </motion.div>
                {phoneError && <div className="text-xs text-red-500 mb-2">{phoneError}</div>}
                {otpSent && (
                  <motion.div
                    className="mb-2 flex gap-2 items-center animate-fadeIn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${otpError ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400 text-sm shadow`}
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="bg-blue-500 text-white px-3 py-2 rounded font-semibold text-xs hover:bg-blue-600 transition duration-200 shadow"
                      disabled={otpValid}
                    >
                      {otpValid ? 'Verified' : 'Verify'}
                    </button>
                  </motion.div>
                )}
                {otpError && <div className="text-xs text-red-500 mb-2">{otpError}</div>}
                <motion.button
                  type="submit"
                  className={`w-full bg-green-600 text-white py-2 rounded font-bold text-base hover:bg-green-700 transition duration-300 ease-in-out shadow mt-2 ${!otpValid ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={!otpValid}
                  whileHover={{ scale: otpValid ? 1.03 : 1 }}
                  whileTap={{ scale: otpValid ? 0.97 : 1 }}
                >
                  Sign Up
                </motion.button>
              </form>
              <motion.p
                className="mt-3 text-gray-600 text-xs text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-bold transition-colors"
                  onClick={closeModal}
                >
                  Login
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animations */}
      <style>
        {`
          @keyframes bounce {
            0% { transform: scale(0.9);}
            60% { transform: scale(1.05);}
            100% { transform: scale(1);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s;
          }
          .animate-3dBox {
            box-shadow: 0 8px 24px 0 rgba(34,197,94,0.15), 0 1.5px 6px 0 rgba(59,130,246,0.10);
            transition: box-shadow 0.3s, transform 0.3s;
          }
          .animate-3dBox:hover {
            box-shadow: 0 16px 48px 0 rgba(34,197,94,0.25), 0 3px 12px 0 rgba(59,130,246,0.18);
            transform: translateY(-4px) scale(1.05) rotateX(4deg) rotateY(-4deg);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Contact;