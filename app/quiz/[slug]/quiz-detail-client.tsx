"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * FIX:
 * Added optional `description?: string` in QuizItem.
 * This matches the UI already using quiz.description.
 */
interface QuizItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  time?: number;
  questions?: unknown[];
}

export default function QuizDetailClient({ quiz }: { quiz: QuizItem }) {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {quiz.title}
          </CardTitle>

          {quiz.description && (
            <CardDescription className="text-sm text-muted-foreground">
              {quiz.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {/* KEEP YOUR EXISTING CONTENT BELOW THIS */}
        </CardContent>
      </Card>
    </div>
  );
}
