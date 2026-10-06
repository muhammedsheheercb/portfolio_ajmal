"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

function countWords(nodes: ReactNode): number {
  return Children.toArray(nodes).reduce<number>((count, node) => {
    if (typeof node === "string")
      return count + node.split(/\s+/).filter(Boolean).length;
    if (
      isValidElement<{ children?: ReactNode; className?: string }>(node) &&
      !node.props.className?.includes("accent")
    )
      return count + countWords(node.props.children);
    return count;
  }, 0);
}

function Word({
  children,
  progress,
  index,
  total,
  active,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  active: boolean;
}) {
  // Overlapping ranges make a quiet sweep across words, driven by scroll distance.
  const opacity = useTransform(
    progress,
    [index / (total + 2), (index + 3) / (total + 2)],
    [0.24, 1],
  );
  return (
    <motion.span
      className="scroll-text-word"
      style={{ opacity: active ? opacity : 1 }}
    >
      {children}
    </motion.span>
  );
}

export function ScrollText({
  children,
  as = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 55%"],
  });
  useEffect(() => setReady(true), []);
  const words = useMemo(() => {
    let index = 0;
    const total = countWords(children);
    function decorate(nodes: ReactNode): ReactNode {
      return Children.map(nodes, (node) => {
        if (typeof node === "string")
          return node.split(/(\s+)/).map((word, part) =>
            !word.trim() ? (
              word
            ) : (
              <Word
                key={part}
                progress={scrollYProgress}
                index={index++}
                total={total}
                active={ready && !reduced}
              >
                {word}
              </Word>
            ),
          );
        if (
          isValidElement<{ children?: ReactNode; className?: string }>(node)
        ) {
          if (node.props.className?.includes("accent") || !node.props.children)
            return node;
          return cloneElement(node, {
            children: decorate(node.props.children),
          });
        }
        return node;
      });
    }
    return decorate(children);
  }, [children, scrollYProgress, ready, reduced]);
  const Tag = as;
  // Motion values update opacity directly; scrolling never sets React state.
  return (
    <Tag ref={ref} className={`scroll-text ${className}`}>
      {words}
    </Tag>
  );
}
