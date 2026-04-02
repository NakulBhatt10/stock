import { useState } from "react";
import { learningTopics } from "@/data/learningContent";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

const LearnPage = () => {
  const [openTopic, setOpenTopic] = useState<string | null>(learningTopics[0].id);

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Learning Hub</h1>
          <p className="mt-1 text-muted-foreground">
            Beginner-friendly guides to stock market trading
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {learningTopics.map((topic) => {
            const isOpen = openTopic === topic.id;
            return (
              <div key={topic.id} className="glass-card-hover overflow-hidden">
                <button
                  onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <span className="text-3xl">{topic.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">{topic.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{topic.summary}</p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                </button>

                {isOpen && (
                  <div className="animate-fade-in border-t border-border/30 px-5 pb-5 pt-4">
                    <div className="space-y-3">
                      {topic.content.map((para, i) => (
                        <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                          {para}
                        </p>
                      ))}
                    </div>

                    <div className="mt-5 rounded-lg bg-primary/5 border border-primary/20 p-4">
                      <p className="mb-2 text-xs font-semibold uppercase text-primary">Key Takeaways</p>
                      <ul className="space-y-1.5">
                        {topic.keyTakeaways.map((kt) => (
                          <li key={kt} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {kt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
