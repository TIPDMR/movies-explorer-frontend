import { ReactComponent as ImageTooltipIconError } from "../../images/ui/tooltip-error.svg";
import { ReactComponent as ImageTooltipIconSuccess } from "../../images/ui/tooltip-success.svg";
import { useEffect } from "react";

const InfoTooltip = ({ isOpen, onClose, onCloseClickOverlay, text, typeError }) => {
  const getIcon = () => {
    switch (typeError) {
    case "error":
      return <ImageTooltipIconError/>;
    case "success":
      return <ImageTooltipIconSuccess/>;
    default :
      return <ImageTooltipIconError/>;
    }
  };

  function handleEscClose(evn) {
    if (evn.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (<div
    className={`info-tooltip ${isOpen ? 'info-tooltip_visible' : ""}`}
    tabIndex="-1"
    role="dialog"
    onClick={onCloseClickOverlay}>
    <div className="info-tooltip__container info-tooltip__container_type_tooltip" role="document">
      <button
        type="button"
        className="info-tooltip__button info-tooltip__button_action_close"
        onClick={onClose}
      />
      <div className={`info-tooltip__tooltip-img info-tooltip__tooltip-img_${typeError}`}>
        {getIcon()}
      </div>

      <span className="info-tooltip__tooltip-text">{text}</span>
    </div>
  </div>);
};

export default InfoTooltip;
