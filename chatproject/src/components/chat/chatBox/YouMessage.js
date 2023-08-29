function YouMessage({ displayName, messageTime, messageDate, message }) {

    function isRTL(s) {
        /* eslint-disable-next-line no-control-regex */
        const firstNonAsciiCharIndex = s.message.search(/[^\x00-\x7F]/);
        return firstNonAsciiCharIndex !== -1;
    }

    return (
        <li className="you">
            <div className="entete">
                <span className="status green" />
                <h2>{displayName}</h2>&nbsp;
                <h3>{messageDate}, {messageTime}</h3>
            </div>
            <div style={isRTL({ message }) ? { direction: 'rtl' } : { direction: 'ltr' }} className="bubble you-message message">{message}</div>
        </li>
    );
}
export default YouMessage;