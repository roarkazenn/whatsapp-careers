interface SuccessModalProps {
  onClose: () => void;
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative z-10">
        <div className="text-center">
          <div className="success-animation mb-6">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
              alt="WhatsApp Logo" 
              className="h-8 w-8 mr-2" 
            />
            <h3 className="text-xl font-bold text-gray-800">Đã gửi đơn ứng tuyển!</h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left border-l-4 border-whatsapp-green">
            <p className="text-gray-700">
              Cảm ơn bạn đã quan tâm đến vị trí tại WhatsApp. 
              <span className="block mt-2">
                Chúng tôi đã nhận được hồ sơ của bạn và sẽ liên hệ trong thời gian sớm nhất.
              </span>
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={onClose}
              className="bg-whatsapp-green text-white px-6 py-2 rounded-lg hover:bg-whatsapp-light transition flex justify-center items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Đóng
            </button>
            
            <a 
              href="#vi-tri"
              onClick={onClose}
              className="text-whatsapp-green hover:text-whatsapp-light transition text-sm"
            >
              Xem các vị trí tuyển dụng khác
            </a>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .success-animation {
          margin: 0 auto;
        }
        
        .checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: block;
          stroke-width: 2;
          stroke: #25D366;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #25D366;
          animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
          position: relative;
          margin: 0 auto;
        }
        
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: #25D366;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        
        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        
        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes scale {
          0%, 100% {
            transform: none;
          }
          50% {
            transform: scale3d(1.1, 1.1, 1);
          }
        }
        
        @keyframes fill {
          100% {
            box-shadow: inset 0px 0px 0px 30px #25D366;
          }
        }
      `}} />
    </div>
  );
}
