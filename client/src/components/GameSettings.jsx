import { useState, useRef, useEffect } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import backgroundMusic from "../assets/audio/Shortwire - Reconfig [PV].mp3";
import Swal from "sweetalert2";

function GameSettings() {
  const [music, setMusic] = useState(true);
  const musicRef = useRef(null);
  const location = useLocation();

  const navigate = useNavigate();

  const signOut = () => {
    Swal.fire({
      title: "<h2>Are you sure?</h2>",
      icon: "warning",
      html: "You will be logged out",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "<span>Yes</span>",
      confirmButtonColor: "#F26379",
      cancelButtonText: "<span>Cancel</span>",
      cancelButtonColor: "#6D27D9",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/");
      }
    });
  };

  const toggleMusic = () => {
    setMusic(!music);
  };

  useEffect(() => {}, [location.pathname]);

  useEffect(() => {
    // Memainkan atau memberhentikan musik latar belakang saat komponen dimuat atau di-unmount
    if (musicRef.current && music) {
      musicRef.current.play();
    }

    return () => {
      let musicReference = musicRef;
      if (musicReference?.current) {
        musicReference.current.pause();
      }
    };
  }, [music]); // Efek ini hanya berjalan pada perubahan isMusicPlaying

  return (
    <>
      <div className="absolute top-1 right-20 z-10">
        <div className="flex justify-between items-center gap-10 text-gray-300 font-Rubik">
          {music ? (
            <div className=" text-gray-300 font-Rubik">
              <button onClick={toggleMusic} className="flex items-center">
                <MdMusicNote size={40} color="lightblue" />
                <p>ON</p>
              </button>
            </div>
          ) : (
            <div className="flex items-center text-gray-300 font-Rubik">
              <button onClick={toggleMusic} className="flex items-center">
                <MdMusicOff size={40} color="lightblue" />
                <p>OFF</p>
              </button>
            </div>
          )}
          <div>
            {location.pathname !== "/" && location.pathname !== '/main-menu' && (
              <button onClick={signOut}>Quit Game </button>
            )}
          </div>
        </div>
        <audio ref={musicRef} loop src={backgroundMusic} />
      </div>
    </>
  );
}

export default GameSettings;
