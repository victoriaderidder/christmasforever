import { FC } from "react";
import styles from "./tree-visual.module.css";

const TreeVisual: FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.treeContainer}>
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
        <div className={styles.ornament + " " + styles.or7}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or8}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or9}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or10}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or11}>
          <div className={styles.shine}></div>
        </div>
        <div className={styles.ornament + " " + styles.or12}>
          <div className={styles.shine}></div>
        </div>
      </div>
      <div className={styles.snow}></div>
    </div>
  );
};

export default TreeVisual;
