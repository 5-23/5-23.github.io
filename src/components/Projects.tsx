import { ArrowUpRight, FolderOpen, Package, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Skeleton } from "@/components/ui/Skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { AnimatedContent } from "@/components/reactbits/AnimatedContent";
import { CountUp } from "@/components/reactbits/CountUp";
import { TiltCard } from "@/components/reactbits/TiltCard";
import { Section } from "@/components/Section";
import { Row } from "@/components/layout/Layout";
import { Body, Caption, Text } from "@/components/Typography";
import { repoFromUrl, useGithubStars, type StarsState } from "@/hooks/useGithubStars";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Content, Project } from "@/content";

function StarCount({
  repo,
  state,
  labels,
}: {
  repo: string | null;
  state: StarsState;
  labels: Content["github"];
}) {
  if (!repo) return null;

  if (state.status === "loading") {
    return <Skeleton className="h-4 w-10 rounded-sm" />;
  }

  const count = state.stars[repo];

  if (state.status === "error" || count === undefined) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Caption
            tone="faint"
            role="img"
            aria-label={labels.failed}
            tabIndex={0}
            className="inline-flex h-4 cursor-help items-center gap-1 rounded-sm"
          >
            <Star className="size-3" />–
          </Caption>
        </TooltipTrigger>
        <TooltipContent>{labels.failed}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Caption tone="faint" className="inline-flex h-4 items-center gap-1">
      <span className="sr-only">{labels.stars}: </span>
      <Star className="size-3 text-orange" aria-hidden="true" />
      <CountUp value={count} />
    </Caption>
  );
}

function ProjectCard({
  project,
  state,
  labels,
  featured,
}: {
  project: Project;
  state: StarsState;
  labels: Content["github"];
  featured?: boolean;
}) {
  const mainLink = project.links[0];
  const repo = repoFromUrl(mainLink?.href ?? "");

  return (
    <div className={cn("h-full", featured && "sm:col-span-2")}>
      <TiltCard className="h-full" max={featured ? 2 : 4}>
        <article
          className={cn(
            "flex h-full flex-col gap-3 rounded-lg bg-surface p-4 transition-colors ease-smooth hover:bg-raised",
            featured && "sm:p-6"
          )}
        >
          <Row gap={2} className="justify-between">
            <a
              href={mainLink?.href}
              target="_blank"
              rel="noreferrer"
              className="group/link flex min-w-0 items-center gap-2 rounded-sm"
            >
              <Text
                as="h3"
                variant={featured ? "headline" : "subtitle"}
                className="truncate transition-colors ease-smooth group-hover/link:text-primary-soft"
              >
                {project.name}
              </Text>
            </a>
            <StarCount repo={repo} state={state} labels={labels} />
          </Row>
          <Body tone="muted" className="flex-1">
            {project.description}
          </Body>
          <Row gap={1} wrap>
            {project.links.map((link) => (
              <Button key={link.href} asChild variant="ghost" size="sm">
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.icon === "package" ? <Package /> : <GithubIcon className="size-4" />}
                  {link.label}
                  <ArrowUpRight className="text-faint" />
                </a>
              </Button>
            ))}
          </Row>
        </article>
      </TiltCard>
    </div>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const repos = t.projects
    .map((project) => repoFromUrl(project.links[0]?.href ?? ""))
    .filter((repo): repo is string => repo !== null);
  const state = useGithubStars(repos);

  return (
    <Section
      id="projects"
      title={t.sections.projects}
      count={String(t.projects.length)}
      icon={<FolderOpen className="size-4 text-blue" />}
      index="02"
    >
      <AnimatedContent stagger scale={0.96} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {t.projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            state={state}
            labels={t.github}
            featured={index === 0}
          />
        ))}
      </AnimatedContent>
    </Section>
  );
}
