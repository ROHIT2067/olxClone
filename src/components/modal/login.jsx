import { useEffect, useState } from "react";
import { Modal, ModalBody } from "flowbite-react";
import mobile from "../../assets/mobile.svg";
import guitar from "../../assets/guita.png";
import love from "../../assets/love.png";
import close from "../../assets/close.svg";
import google from '../../assets/google.png'
import avatar from '../../assets/avatar.png'
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from '../firebase/firebase'

const slides = [
  {
    image: guitar,
    alt: "Guitar",
    text: "Help us become one of the safest places to buy and sell.",
  },
  {
    image: love,
    alt: "Hearts",
    text: "Close deals from the comfort of your home.",
  },
  {
    image: avatar,
    alt: "Profile",
    text: "Keep all your favorites in one place.",
  },
];

function Login({ toggleModal, status }) {
  const handleClick=async ()=>{
    try {
    const rslt=await signInWithPopup(auth, provider)
      toggleModal()
      console.log('user : ',rslt)
    } catch (error) {
      console.log(error)
    }
  }
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!status) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [status]);

  const changeSlide = (direction) => {
    setActiveSlide((current) =>
      (current + direction + slides.length) % slides.length,
    );
  };

  return (
    <Modal show={status} onClose={toggleModal} position="center" size="md" popup>
        <div className="relative h-64 bg-white px-6 pt-6">
          <button
            type="button"
            onClick={toggleModal}
            className="absolute right-4 top-4 z-10 rounded-full p-1 hover:bg-gray-100"
            aria-label="Close login modal"
          >
            <img src={close} alt="" className="h-6 w-6" />
          </button>

          <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden px-10">
            <img
              className="mb-5 h-24 w-24 object-contain"
              src={slides[activeSlide].image}
              alt={slides[activeSlide].alt}
            />
            <p className="max-w-xs text-center font-semibold text-[#002f34]">
              {slides[activeSlide].text}
            </p>

            <button
              type="button"
              onClick={() => changeSlide(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-3xl text-[#002f34]"
              aria-label="Previous slide"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={() => changeSlide(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-3xl text-[#002f34]"
              aria-label="Next slide"
            >
              &#8250;
            </button>

            <div className="absolute bottom-3 flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.alt}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 w-2 rounded-full ${
                    activeSlide === index ? "bg-[#002f34]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <ModalBody className="rounded-b-lg bg-white px-6 pb-6 pt-0">
          <button className="relative mb-3 flex h-12 w-full items-center rounded-md border-2 border-[#002f34] px-4 hover:bg-gray-50">
            <img className="mr-3 h-6 w-6" src={mobile} alt="" />
            <span className="text-sm font-bold">Continue with phone</span>
          </button>

          <button className="relative flex h-12 w-full items-center justify-center rounded-md border-2 border-gray-300 px-4 hover:bg-gray-50 active:bg-teal-50" onClick={handleClick}>
            <img className="absolute left-4 h-6 w-6" src={google} alt="Google" />
            <span className="text-sm text-gray-600">Continue with Google</span>
          </button>

          <div className="flex flex-col items-center pt-5">
            <p className="text-sm font-semibold">OR</p>
            <button className="pt-3 text-sm font-bold underline underline-offset-4">
              Login with Email
            </button>
          </div>

          <div className="flex flex-col items-center pt-12 text-center text-xs text-gray-700">
            <p>All your personal details are safe with us.</p>
            <p className="pt-5">
              If you continue, you are accepting{" "}
              <span className="text-blue-600">
                OLX Terms and Conditions and Privacy Policy
              </span>
            </p>
          </div>
        </ModalBody>
      </Modal>
  );
}

export default Login;
