import { MoneyIcon } from "../MoneyIcon/MoneyIcon";
import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          zIndex: 100,
        }}
      >
        <motion.div
          className=""
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 0,
            duration: 2,
          }}
        >
          <MoneyIcon size="loader" />
        </motion.div>
        <br />
        <div
          style={{
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: 20,
            zIndex: 100,
            color: "white",
          }}
        >
          Загрузка...
        </div>
      </div>
    </div>
  );
};
