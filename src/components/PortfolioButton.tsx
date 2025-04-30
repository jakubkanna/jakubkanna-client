import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PortfolioButton = ({ url }: { url?: string | null }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const triggerForm = () => {
    setIsVisible(true);
  };

  function handleClick() {
    if (url) {
      window.open(url, "_blank");
    } else {
      navigate("/contact");
    }
  }

  const Download = () => {
    return (
      <>
        {!isVisible ? (
          <span className="link" onClick={triggerForm}>
            Download CV
          </span>
        ) : (
          <div id="mc_embed_signup">
            <form
              action="https://jakubkanna.us20.list-manage.com/subscribe/post?u=837187f00032092e6c9a48147&amp;id=7ab2644c97&amp;f_id=00815eeef0"
              method="post"
              target="_blank"
              className="d-flex gap-2 align-items-start flex-wrap"
            >
              <div className="mb-2">
                <input
                  type="email"
                  name="EMAIL"
                  placeholder="your-email@example.com*"
                  required
                  id="mce-EMAIL"
                  className="form-control"
                />
              </div>
              <input type="hidden" name="tags" value="4227809" />
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_837187f00032092e6c9a48147_7ab2644c97"
                  tabIndex={-1}
                  value=""
                />
              </div>
              <div className="mb-2">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="btn btn-dark"
                  value="Send"
                />
              </div>
            </form>
            <small className="text-muted" style={{ fontSize: "10px" }}>
              * Your email will be used to send the CV via Mailchimp and stored
              securely for contact purposes. You can unsubscribe anytime.
            </small>
          </div>
        )}
      </>
    );
  };

  return url ? (
    <Download />
  ) : (
    <span className="link" onClick={handleClick}>
      Request PDF
    </span>
  );
};

export default PortfolioButton;
