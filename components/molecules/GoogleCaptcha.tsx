import React, { useRef } from "react";
import { useEffect } from "react";

function GoogleCaptcha(props: { onSuccess: () => void }) {
  const { onSuccess } = props;
  useEffect(() => {
    try {
      window.grecaptcha.render("g-recaptha", {
        sitekey: "6LcnDhglAAAAAJLZ4B8MRtFC0lY9PEsTCMKs89AB",
        callback: function (res: any) {
          if (res) {
            onSuccess();
          }
        },
      });
    } catch (_error) {}
  }, []);
  return (
    <div
      id="g-recaptha"
      data-sitekey="6LcnDhglAAAAAJLZ4B8MRtFC0lY9PEsTCMKs89AB"
    ></div>
  );
}

export default GoogleCaptcha;
