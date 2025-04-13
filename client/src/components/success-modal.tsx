interface SuccessModalProps {
  onClose: () => void;
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative z-10">
        <div className="text-center">
          <div className="bg-whatsapp-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Đã gửi đơn ứng tuyển!</h3>
          <p className="text-gray-600 mb-6">Cảm ơn bạn đã quan tâm đến vị trí tại WhatsApp. Chúng tôi sẽ xem xét hồ sơ của bạn và liên hệ trong thời gian sớm nhất.</p>
          <button 
            onClick={onClose}
            className="bg-whatsapp-green text-white px-6 py-2 rounded-lg hover:bg-whatsapp-light transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
