import { useState, useRef } from "react";
import addImage from "../../../icons/add-image.png"
import addFile from "../../../icons/add-file.png"
import emojiKeyboardIcon from "../../../icons/EmojiKeyboard.png";
import EmojiKeyboard from "./EmojiKeyboard";
import sendIcon from "../../../icons/send.png";
function ChatBoxFooter(props) {

    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendClick = (event) => {
        event.preventDefault();
        if (inputValue) {
            props.onSend(inputValue, "me");
            setInputValue("");
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            e.preventDefault();
            document.getElementById("send-button").click();
        }
        else if (e.key === "Enter" && e.shiftKey === true) {
            const input = document.getElementById("message-input");
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const value = input.value;
            input.value = value.substring(0, start) + "\n" + value.substring(end);
            input.selectionStart = input.selectionEnd = start + 1;
            e.preventDefault();
        }
    };

    const [showEmojiKeyboard, setshowEmojiKeyboard] = useState(false);
    const handleClick = () => {
        setshowEmojiKeyboard(!showEmojiKeyboard);
    }

    return (
        <footer>
            <form>
                <div className="container-fluid textarea-and-buttons">
                    {showEmojiKeyboard ? <div className="row"><EmojiKeyboard
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        inputRef={inputRef} /></div>
                        :
                        <div className="row py-3"></div>}
                    <div className="row">
                        <div className="col-md-12">
                            <textarea
                                id="message-input"
                                type="text"
                                placeholder="Type your message"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                ref={inputRef}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="col-6 d-flex justify-content-start">
                                <img src={addImage} alt="" />
                                <img src={addFile} alt="" />
                                <img src={emojiKeyboardIcon} alt="" onClick={handleClick} />
                            </div>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <img src={sendIcon} alt="" id="send-button" type="submit" onClick={handleSendClick} />
                        </div>
                    </div>
                </div>
            </form>
        </footer>
    );
}
export default ChatBoxFooter;
