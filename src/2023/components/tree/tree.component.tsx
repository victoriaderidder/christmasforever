import { Dispatch, FC, SetStateAction } from "react";
import styles from "./tree.module.css";
import BoxWrapper from "../box/box-wrapper.component";
import Home from "../../../components/home.component";

interface TreeProps {
  showTree: boolean;
  setShowTree: Dispatch<SetStateAction<boolean>>;
  showThanksgiving?: boolean;
  setShowThanksgiving?: Dispatch<SetStateAction<boolean>>;
  showChristmasEve?: boolean;
  setShowChristmasEve?: Dispatch<SetStateAction<boolean>>;
  showChristmas?: boolean;
  setShowChristmas?: Dispatch<SetStateAction<boolean>>;
}

const Tree: FC<TreeProps> = ({
  showTree,
  setShowTree,
  setShowThanksgiving,
  showThanksgiving,
  setShowChristmas,
  showChristmas,
  setShowChristmasEve,
  showChristmasEve,
}) => {
  return (
    /* CSS tree tutorial: 
      https://aleksarad.medium.com/creating-a-simple-christmas-tree-with-pure-css-93e567fef0c9 */
    <div className={styles.main}>
      <Home />
      <div className={styles.treeContainer}>
        <div className={styles.star}></div>
        <div className={styles.starHighlight}></div>
        <div className={styles.starLight}></div>
        <div className={styles.treeTriangle1}></div>
        <div className={styles.treeTriangle2}></div>
        <div className={styles.treeTriangle3}></div>
        <div className={styles.trunk}></div>
        <div className={styles.ornament + " " + styles.or1}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or2}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or3}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or4}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or5}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or6}>
          <div className={styles.shine}></div>
        </div>
        </div>
      <div className={styles.snow}></div>
      <div className={styles.boxRow}>
        <BoxWrapper
          showTree={showTree}
          setShowTree={setShowTree}
          showThanksgiving={showThanksgiving}
          setShowThanksgiving={setShowThanksgiving}
          showChristmasEve={showChristmasEve}
          setShowChristmasEve={setShowChristmasEve}
          showChristmas={showChristmas}
          setShowChristmas={setShowChristmas}
        />
      </div>
    </div>
  );
};

export default Tree;
