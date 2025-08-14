import React, { useEffect, useRef, useState } from 'react'
import styles from './ExpandCollapseSection.module.css'

export const ExpandCollapseSection = ({title, children}) => {

	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef(null);
	const [height, setHeight] = useState("0px");

	useEffect(() => {
		if (contentRef.current) {
		setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
		}
	}, [isOpen]);

  return (
	 <div className={styles.section}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={styles.icon}>{isOpen ? "▲" : "▼"}</span>
      </div>

      <div
        ref={contentRef}
        className={styles.contentWrapper}
        style={{ maxHeight: height }}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
