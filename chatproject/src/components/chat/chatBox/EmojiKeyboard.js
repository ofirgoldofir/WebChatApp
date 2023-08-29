import React, { useEffect } from "react";

function EmojiKeyboard({ inputValue, setInputValue, inputRef }) {

    const handleClick = (e) => {
        setInputValue(inputValue + e.target.textContent);
        inputRef.current.focus();
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    return (
        <div id="con">
            <div className="emojiPicker">
                <div className="emojis">
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😀</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😁</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😂</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤣</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😃</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😄</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😅</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😆</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😉</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😊</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😋</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😎</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😍</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😘</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😗</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😙</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😚</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😇</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😐</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😑</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😶</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😏</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😣</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😥</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😮</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😯</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😪</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😫</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😴</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😌</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😛</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😜</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😝</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤤</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😒</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😓</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😔</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😕</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🙃</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤑</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😲</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😷</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤐</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😴</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😵</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤢</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤧</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥺</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤩</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥳</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥴</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥵</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥶</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😀</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😁</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😂</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤣</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😃</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😄</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥴</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥵</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥶</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥷</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥸</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥲</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥰</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥲</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥶</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥵</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥴</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥳</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥺</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤨</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🧐</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥱</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥱</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥱</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤤</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥴</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤮</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤢</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤧</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤒</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤕</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😀</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😁</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😂</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤣</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😃</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😄</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥳</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥺</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤩</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥲</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥸</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤯</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤬</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤔</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤫</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤭</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😶‍🌫️</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😐</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🥱</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤥</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😀</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😁</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😂</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤣</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😃</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>😈</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👿</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💀</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💩</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤡</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👻</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💋</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👋</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤚</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🖐</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>✋</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🖖</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👌</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>✌️</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤞</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤟</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤘</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤘</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤙</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👈</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👉</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👆</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👇</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>☝️</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤝</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤜</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤛</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤏</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>✍️</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💅</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤳</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💪</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦵</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦶</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👄</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦷</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👅</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👂</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👃</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👁️‍🗨️</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>👀</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🧠</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦴</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦸</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦹</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦝</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦙</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦛</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦘</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦡</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦢</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦚</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦜</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦞</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦟</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🦠</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🧡</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💛</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💚</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💙</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💜</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🖤</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤍</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤎</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>❤️</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🧡</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💛</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💚</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💙</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>💜</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🤍</span></div>
                    <div className="emojiFrame"><span className="emoji" onClick={handleClick}>🖤</span></div>
                </div>
            </div>
        </div>
    );
}
export default EmojiKeyboard;