function generateCombinations(arr, r) {
    const n = arr.length;

    function combinationUtil(data, start, index) {
        if (index === r) {
            console.log("'"+data+("', "));
            count++;
            return;
        }

        for (let i = start; i < n; i++) {
            data[index] = arr[i];
            combinationUtil(data, i + 1, index + 1);
        }
    }

    const data = new Array(r);
    combinationUtil(data, 0, 0);
}

// Array of tokens and routes
const tokenArr = ["0x5ac53f985ea80c6af769b9272f35f122201d0f56",
"0x4e834cdcc911605227eedddb89fad336ab9dc00a",
"0x2BAe00C8BC1868a5F7a216E881Bae9e662630111",
"0xC4bdd27c33ec7daa6fcfd8532ddB524Bf4038096",
"0x5ce9F0B6AFb36135b5ddBF11705cEB65E634A9dC",
"0x5C92A4A7f59A9484AFD79DbE251AD2380E589783",
"0x0fAD0ED848A7A16526E8a7574e418B015Dbf41B5",
"0x0f00576d07B594Bdc1caf44b6014A6A02E5AFd48",
"0xdc7acde9ff18b4d189010a21a44ce51ec874ea7c",
"0xb7e3617adb58dc34068522bd20cfe1660780b750",
"0x8bec47865ade3b172a928df8f990bc7f2a3b9f79",
"0x8973c9ec7b79fe880697cdbca744892682764c37",
"0xb59d0fdaf498182ff19c4e80c00ecfc4470926e2",
"0x2b9025aecc5ce7a8e6880d3e9c6e458927ecba04",
"0xe4baf0af161bf03434d1c5a53957981493c12c99",
"0xdeacf0faa2b80af41470003b5f6cd113d47b4dcd",
"0xabe9818c5fb5e751c4310be6f0f18c8d85f9bd7f",
"0x026dda7f0f0a2e42163c9c80d2a5b6958e35fc49",
"0xe3520349f477a5f6eb06107066048508498a291b",
"0xe301ed8c7630c9678c39e4e45193d1e7dfb914f7",
"0xea62791aa682d455614eaa2a12ba3d9a2fd197af",
"0xda2585430fef327ad8ee44af8f1f989a2a91a3d2",
"0xc8fdd32e0bf33f0396a18209188bb8c6fb8747d2",
"0x6454e4a4891c6b78a5a85304d34558dda5f3d6d8",
"0xE4eB03598f4DCAB740331fa432f4b85FF58AA97E",
"0x94190d8ef039c670c6d6b9990142e0ce2a1e3178",
"0xfca152a9916895bf564e3f26a611f9e1e6aa6e73",
"0x1d1f82d8b8fc72f29a8c268285347563cb6cd8b3",
"0xd126b48c072f4668e944a8895bc74044d5f2e85b",
"0x74974575d2f1668c63036d51ff48dbaa68e52408",
"0xC86Ca2BB9C9c9c9F140d832dE00BfA9e153FA1e3",
"0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
"0x6EBA841F1201fFDDe7DDC2ba995D3308f6C4aEa0",
"0x90eb16621274fb47a071001fbbf7550948874cb5",
"0x449f661c53aE0611a24c2883a910A563A7e42489",
"0x951cfdc9544b726872a8faf56792ef6704731aae",
"0x07b2055fbd17b601c780aeb3abf4c2b3a30c7aae",
"0x885f8CF6E45bdd3fdcDc644efdcd0AC93880c781",
"0x291c8fceaca3342b29cc36171deb98106f712c66",
"0x8828a5047d093f6354e3fe29ffcb2761300dc994",
"0x18921f1e257038e538ba24d49fa6495c8b1617bc",
"0xdc9be1ff012d3c6da818d136a3b2e5fdd4442f74",
"0x7821c773a12485b12a2b5b7bc451c3eb200986b1",
"0xFa94348467f64D5A457F75F8bc40495D33c65aBB",
"0x984c2505a14da732d7271416356f535953610340",
"0x1bc741235ec0ee86ad488fa49b69bb6c823ee7b7",
"0xb12bfca5a55806aaf64e99521918a4bf0fc40802",
"0x4988a896b1227218e4a686fde5eabdcabd91571f",
"0x098d5b6a26bca1d71f2335805d71b244f94e8a5f",
"0xf4eb217ba2454613b15dbdea6e5f22276410e89e",
"0xf34d508bac379825255cc80f66cbc89dfeff92e4",
"0x7ca1c28663b76cfde424a9494555b94846205585",
"0xa64514a8af3ff7366ad3d5daa5a548eefcef85e0",
"0xE9F226a228Eb58d408FdB94c3ED5A18AF6968fE1"];

const routerArr = [
    "0x2CB45Edb4517d5947aFdE3BEAbF95A582506858B",
    "0xa3a1ef5ae6561572023363862e238afa84c72ef5",
    "0xA1B1742e9c32C7cAa9726d8204bD5715e3419861"
];

let count = 0;

// Generate combinations of 3 tokens and 2 routes
generateCombinations(tokenArr, 3);
// generateCombinations(routerArr, 2);

console.log("Total combinations:", count);
