const stars = [
  { top: "4%", left: "6%", size: 2, delay: "0s", duration: "4.6s" },
  { top: "8%", left: "18%", size: 1.5, delay: "1.4s", duration: "3.8s" },
  { top: "3%", left: "31%", size: 2.5, delay: "0.6s", duration: "5.2s" },
  { top: "11%", left: "44%", size: 1.5, delay: "2.1s", duration: "4.1s" },
  { top: "6%", left: "57%", size: 2, delay: "0.9s", duration: "3.4s" },
  { top: "2%", left: "71%", size: 1.5, delay: "2.8s", duration: "5.6s" },
  { top: "9%", left: "84%", size: 2.5, delay: "1.1s", duration: "4.4s" },
  { top: "5%", left: "93%", size: 1.5, delay: "0.3s", duration: "3.6s" },
  { top: "16%", left: "3%", size: 1.5, delay: "1.8s", duration: "4.8s" },
  { top: "14%", left: "12%", size: 2, delay: "3.2s", duration: "5.1s" },
  { top: "19%", left: "24%", size: 1.5, delay: "0.4s", duration: "3.9s" },
  { top: "13%", left: "37%", size: 2, delay: "2.4s", duration: "4.7s" },
  { top: "18%", left: "51%", size: 1.5, delay: "1.6s", duration: "5.4s" },
  { top: "15%", left: "66%", size: 2.5, delay: "0.7s", duration: "3.5s" },
  { top: "21%", left: "78%", size: 1.5, delay: "2.9s", duration: "4.3s" },
  { top: "17%", left: "90%", size: 2, delay: "1.2s", duration: "5.8s" },
  { top: "27%", left: "8%", size: 2, delay: "2.2s", duration: "4.9s" },
  { top: "24%", left: "21%", size: 1.5, delay: "0.5s", duration: "3.7s" },
  { top: "29%", left: "34%", size: 1.5, delay: "3.1s", duration: "5.3s" },
  { top: "23%", left: "48%", size: 2, delay: "1.7s", duration: "4.2s" },
  { top: "28%", left: "62%", size: 1.5, delay: "0.8s", duration: "3.3s" },
  { top: "25%", left: "75%", size: 2.5, delay: "2.6s", duration: "5.7s" },
  { top: "31%", left: "88%", size: 1.5, delay: "1.3s", duration: "4.5s" },
  { top: "36%", left: "5%", size: 1.5, delay: "2.7s", duration: "5.5s" },
  { top: "34%", left: "16%", size: 2, delay: "0.2s", duration: "3.8s" },
  { top: "39%", left: "29%", size: 1.5, delay: "1.9s", duration: "4.6s" },
  { top: "33%", left: "42%", size: 2, delay: "3.4s", duration: "5.9s" },
  { top: "38%", left: "55%", size: 1.5, delay: "0.6s", duration: "4s" },
  { top: "35%", left: "69%", size: 2.5, delay: "2.3s", duration: "3.6s" },
  { top: "41%", left: "82%", size: 1.5, delay: "1.5s", duration: "5s" },
  { top: "37%", left: "95%", size: 2, delay: "2s", duration: "4.8s" },
  { top: "46%", left: "11%", size: 1.5, delay: "0.9s", duration: "5.2s" },
  { top: "44%", left: "27%", size: 2, delay: "3s", duration: "3.9s" },
  { top: "48%", left: "46%", size: 1.5, delay: "1.1s", duration: "4.4s" },
  { top: "43%", left: "63%", size: 1.5, delay: "2.5s", duration: "5.6s" },
  { top: "47%", left: "86%", size: 2, delay: "0.4s", duration: "4.1s" },
] as const;

export function RetroBackdrop() {
  return (
    <div className="retro-backdrop" aria-hidden>
      {stars.map((star) => (
        <span
          key={`${star.top}-${star.left}`}
          className="retro-star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
      <div className="retro-glow" />
      <div className="retro-floor">
        <div className="retro-grid" />
      </div>
    </div>
  );
}
