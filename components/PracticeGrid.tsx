import Link from "next/link";
import { practices } from "@/content/practices";

/** The six practices as a hairline grid, each linking to its Advisory section. */
export function PracticeGrid() {
  return (
    <div className="grid-lines">
      {practices.map((practice, index) => (
        <Link key={practice.id} className="cell" href={`/advisory#${practice.id}`}>
          <span className="num">{String(index + 1).padStart(2, "0")}</span>
          <h3>{practice.name}</h3>
          <p>{practice.line}</p>
          <span className="more">Explore</span>
        </Link>
      ))}
    </div>
  );
}
