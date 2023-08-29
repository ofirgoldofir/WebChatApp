function MeMessage({ messageTime, messageDate, message }) {

    function isRTL(s) {
        /* eslint-disable-next-line no-control-regex */
        const firstNonAsciiCharIndex = s.message.search(/[^\x00-\x7F]/);
        return firstNonAsciiCharIndex !== -1;
    }

    return (
        <li className="me">
            <div className="entete">
                <h3>{messageTime}, {messageDate}</h3>&nbsp;
                <h2>Me</h2>
                <span className="status blue" />
            </div>
            <div style={isRTL({ message }) ? { direction: 'rtl' } : { direction: 'ltr' }} className="bubble me-message message">{message}</div>
        </li>
    );
}
export default MeMessage;