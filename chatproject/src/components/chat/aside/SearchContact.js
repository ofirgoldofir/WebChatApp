import React, { useRef } from 'react';

function SearchContact({ doSearch }) {

    const searchBox = useRef(null);

    const searchContact = function () {
        doSearch(searchBox.current.value);
    }

    return (
        <input ref={searchBox} onKeyUp={searchContact} className="search-contact-text" type="text" placeholder="search" />
    );
}
export default SearchContact;