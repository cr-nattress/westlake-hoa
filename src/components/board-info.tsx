"use client";

import { Users, Vote, Gavel, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BOARD_MEMBERS,
  BOARD_AUTHORITY,
  KNOWLEDGE_BASE_METADATA,
} from "@/lib/data/institutional-knowledge";

export function BoardMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Board of Directors
        </CardTitle>
        <CardDescription>Current board composition</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {BOARD_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.position}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                As of {member.asOfDate}
              </Badge>
            </div>
          ))}

          {BOARD_MEMBERS.length === 1 && (
            <p className="text-sm text-muted-foreground italic">
              Other board positions not currently documented.
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Last updated: {KNOWLEDGE_BASE_METADATA.lastUpdated}
        </p>
      </CardContent>
    </Card>
  );
}

export function BoardAuthority() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gavel className="h-5 w-5" />
          Board Authority
        </CardTitle>
        <CardDescription>
          Powers and responsibilities of the Board
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3">The Board is empowered to:</h4>
          <ul className="space-y-2">
            {BOARD_AUTHORITY.powers.map((power) => (
              <li key={power} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">•</span>
                {power}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function DecisionMaking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vote className="h-5 w-5" />
          Decision Making
        </CardTitle>
        <CardDescription>How the Board makes decisions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3">The Board may act through:</h4>
          <ul className="space-y-2">
            {BOARD_AUTHORITY.decisionMaking.methods.map((method) => (
              <li key={method} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">•</span>
                {method}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">
            Votes must be recorded for:
          </h4>
          <ul className="space-y-2">
            {BOARD_AUTHORITY.decisionMaking.recordedVotes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-amber-500 mt-0.5">!</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function BoardInfo() {
  return (
    <div className="space-y-6">
      <BoardMembers />
      <div className="grid gap-6 md:grid-cols-2">
        <BoardAuthority />
        <DecisionMaking />
      </div>
    </div>
  );
}
