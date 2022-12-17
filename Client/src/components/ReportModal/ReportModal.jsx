import "./ReportModal.css";
import { Modal } from "@mantine/core";

function ReportModal({ openReportModal, closeReportModal }) {
  return (
    <Modal
      centered
      opened={openReportModal}
      onClose={closeReportModal}
      title="Report post"
    >
      <div className="report-post">
        <div className="report-input">
          <input type="radio" value="spam" checked name="report" id="spam" />
          <div>
            <label htmlFor="spam">Spam</label>
            <p>Misleading or repetitive posts</p>
          </div>
        </div>
        <div className="report-input">
          <input type="radio" value="nudity" name="report" />
          <div>
            <label htmlFor="nudity">Nudity or pornography</label>
            <p>Sexually explicit content</p>
          </div>
        </div>
        <div className="report-input">
          <input type="radio" value="hate" name="report" id="hate" />
          <div>
            <label htmlFor="hate">Hate speech</label>
            <p>Attack directed at protected group</p>
          </div>
        </div>
        <div className="report-input">
          <input
            type="radio"
            value="selfInjury"
            name="report"
            id="selfInjury"
          />
          <div>
            <label htmlFor="selfInjury">Self Injury</label>
            <p>Eating disorder, cutting promoting suicide</p>
          </div>
        </div>
        <div className="report-input">
          <input type="radio" value="violence" name="report" id="violence" />
          <div>
            <label htmlFor="violence">Graphic violence</label>
            <p>Violent images or promotion of violence</p>
          </div>
        </div>
        <div className="report-input">
          <input type="radio" value="copyright" name="report" id="copyright" />
          <div>
            <label htmlFor="violence">My intellectual property</label>
            <p>Copyright or trademark infringement</p>
          </div>
        </div>
      </div>
      <div className="report-submit">
        <button onClick={closeReportModal}>Cancel</button>
        <button>Report</button>
      </div>
    </Modal>
  );
}

export default ReportModal;
