//Split Screen Size
const SplitLayout = ({ leftContent, rightContent }) => {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div
                style={{
                    width: "50%",
                    background: "white",
                    color: "black",
                    padding: "20px",
                }}
            >
                {leftContent}
            </div>
            <div
                style={{
                    width: "50%",
                    background: "#111",
                    color: "white",
                    padding: "20px",
                }}
            >
                {rightContent}
            </div>
        </div>
    );
};

export default SplitLayout;