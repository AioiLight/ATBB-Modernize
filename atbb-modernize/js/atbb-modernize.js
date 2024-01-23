const defaultOptions = {
    smooth: true,
    sans_serif: true,
    search: "direct",
    remove_editheader: true
};

chrome.storage.sync.get(defaultOptions, (options) => {
    if (options.smooth) {
        // スムーススクロール
        const s = document.createElement("style");
        s.textContent = ":root { scroll-behavior: smooth !important; }";
        document.head.appendChild(s);
    }

    if (options.sans_serif) {
        // sans-serif 強制
        const s = document.createElement("style");
        s.textContent = "body, textarea { font-family: sans-serif !important; }";
        document.head.appendChild(s);
    }

    if (options.remove_editheader) {
        // 物件編集時ヘッダー一部削除
        const s = document.createElement("style");
        s.textContent = "#fixedMenu > div > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > table, #fixedMenuDummy2 { display: none; }";
        document.head.appendChild(s);
    }
});

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', doAfterLoaded);
} else {
    doAfterLoaded();
}

function doAfterLoaded() {
    chrome.storage.sync.get(defaultOptions, (options) => {
        {
            // 検索ボックス周り
            const t = document.querySelectorAll(".subtitle");
            if (t) {
                if (t[0].innerText.match("物件検索")) {
                    const inputDirect = document.querySelector("[name=directKensakuGo]");
                    const inputNumber = document.querySelector("[name=kensakuNumber]");

                    if (inputDirect) {
                        inputDirect.addEventListener("keydown", (event) => {
                            if (event.key === "Enter") {
                                document.querySelector("[name=directKensakuGo] ~ input[value=検索]").click();
                            }
                        });

                        if (options.search === "direct") {
                            inputDirect.focus();
                        }
                    }
                    if (inputNumber) {
                        inputNumber.addEventListener("keydown", (event) => {
                            if (event.key === "Enter") {
                                document.querySelector("[name=kensakuNumber] ~ input[value=検索]").click();
                            }
                        });

                        if (options.search === "number") {
                            inputNumber.focus();
                        }
                    }
                }
            }
        }
    });
}