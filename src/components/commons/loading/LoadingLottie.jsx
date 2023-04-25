import Lottie from "react-lottie";
import * as loading from "./119049-loading-animation.json";

const defaultLoading = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LoadingLotie = ({ loading }) => {

  return (
    <>
      {loading && (
        <div style={{ textAlign: "center", marginTop: '300px' }}>
          <Lottie
            options={defaultLoading}
            height={100}
            width={100}
          />
          <span> {"PLEASE WAIT"}</span>
        </div>
      )}
    </>
  );
};

export default LoadingLotie;
