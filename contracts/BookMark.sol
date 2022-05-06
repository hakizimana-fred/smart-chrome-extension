// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

contract BookMark {
    string[] urls;
    string[] tabUrls;

    constructor() {
        urls.push("www.example.com");
    }

    function set(string memory _url) public {
        urls.push(_url);
    }
    

    function get() public view returns(string[] memory) {
     return urls;
    }

    function getById(uint id) public view returns (string memory) {
        return urls[id];
    }

    function setTabUrl(string memory _url) public {
        tabUrls.push(_url);
    }

    function getTabUrls() public view returns(string[] memory) {
        return tabUrls;
    }


}