//let _0x10b3=['length','substr'];(function(_0x41de16,_0x5c139){let _0x4ab5b4=function(_0x5c8d8b){while(--_0x5c8d8b){_0x41de16['push'](_0x41de16['shift']());}};_0x4ab5b4(++_0x5c139);}(_0x10b3,0x1eb));let _0x53d4=function(_0x4cad85,_0x4acccb){_0x4cad85=_0x4cad85-0x0;let _0x72cb5e=_0x10b3[_0x4cad85];return _0x72cb5e;}; function strEncode(_0x30b351){for(let _0x1176b7=0x1;_0x1176b7<0x5;_0x1176b7++){_0x30b351=btoa(_0x30b351)[_0x53d4('0x0')](_0x1176b7)+btoa(_0x30b351)[_0x53d4('0x0')](0x0,_0x1176b7);}return _0x30b351;} function strDecode(_0x29629b){for(let _0x2f47aa=-0x4;_0x2f47aa<0x0;_0x2f47aa++){_0x29629b=atob(_0x29629b[_0x53d4('0x0')](_0x2f47aa)+_0x29629b[_0x53d4('0x0')](0x0,_0x29629b[_0x53d4('0x1')]+_0x2f47aa));}return _0x29629b;}

function btoa(x){
    return Buffer.from(x).toString('base64');
}

function atob(x){
    return Buffer.from(x, 'base64').toString();
}

let strEncode = function (x){
    for(let i=1; i<5; i++){
        x = btoa(x).substr(i) + btoa(x).substr(0,i);
    }
    return x;
}

let strDecode = function (x){
    if(x){
        for(let j=-4; j<0; j++){ 
            x = atob( x.substr(j) + x.substr(0, x.length + j));
        }
    }
    return x;
}

let _base64ToArrayBuffer = function (base64) {
    let binary_string = atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

exports.strEncode = strEncode;
exports.strDecode = strDecode;
exports.btoa = btoa;
exports.atob = atob;
exports._base64ToArrayBuffer = _base64ToArrayBuffer;