import img607079231077652 from "figma:asset/86927be0c9ef143f844e88ed3776aeb7a5fe919a.png";
import imgEllipse22Stroke from "figma:asset/ff03fd629c1b9780b8980ae4d61a2893cb652247.png";
import imgEllipse21Stroke from "figma:asset/61a7a2687469a0e251a5f6fbf0e3e068856f63dc.png";
import { img607079231077653 } from "./svg-g3kpf";

export default function MaskGroup() {
  return (
    <div className="relative w-full h-full" data-name="Mask group">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url('${img607079231077652}')`,
          maskImage: `url('${img607079231077653}')`,
          maskSize: '100% auto',
          maxHeight: '890px',
          zIndex: 1,
        }}
        data-name="6070792_3107765 2"
      />
      <div className="absolute flex items-center justify-center w-[33%] h-[54%] left-[75%] top-[19%] z-[2]">
        <div className="flex-none rotate-[60deg]">
          <div
            className="relative w-full h-full mask-alpha mask-intersect mask-no-repeat mask-position-center"
            style={{ maskImage: `url('${img607079231077653}')`, maskSize: '100% auto' }}
            data-name="Ellipse 22 (Stroke)"
          >
            <img
              className="block w-full h-full object-cover"
              src={imgEllipse22Stroke}
              alt="Ellipse 22"
              style={{ width: '476.674px', height: '475.432px' }}
            />
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center w-[53%] h-[86%] left-[34.4%] top-[-48%] z-[2]">
        <div className="flex-none rotate-[60deg]">
          <div
            className="relative w-full h-full mask-alpha mask-intersect mask-no-repeat mask-position-center"
            style={{ maskImage: `url('${img607079231077653}')`, maskSize: '100% auto' }}
            data-name="Ellipse 21 (Stroke)"
          >
            <img
              className="block w-full h-full object-cover"
              src={imgEllipse21Stroke}
              alt="Ellipse 21"
              style={{ width: '761.262px', height: '759.278px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}