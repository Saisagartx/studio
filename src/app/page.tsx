"use client";

import React from "react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { portfolioData } from "@/lib/data";
import { Logo } from "@/components/icons";
import { Github, Linkedin, Mail, Link as LinkIcon, Phone, Instagram, Facebook } from "lucide-react";
import SkillProgress from "@/components/skill-progress";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Home() {

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Profolio</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="container grid max-w-screen-lg items-center gap-6 pb-8 pt-6 md:py-24">
          <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:gap-12">
            <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                {portfolioData.profile.name}
              </h1>
              <p className="mt-4 max-w-[700px] text-lg text-muted-foreground">
                {portfolioData.bio}
              </p>
              <div className="mt-6 flex gap-4">
                <Button asChild>
                  <a href="#contact">Get in Touch</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#projects">View My Work</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Avatar className="h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 border-4 border-primary/20 shadow-lg">
                <AvatarImage src={portfolioData.avatarUrl} alt={portfolioData.profile.name} />
                <AvatarFallback>{portfolioData.profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          className="container max-w-screen-lg py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
            <p className="mt-4 text-muted-foreground">
              {portfolioData.aboutMe}
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        {portfolioData.profile.skills.length > 0 && (
          <motion.section
            id="skills"
            className="w-full py-16 bg-muted/40"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <div className="container max-w-screen-lg">
              <h2 className="text-center text-3xl font-bold tracking-tight">Technical Skills</h2>
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
                {portfolioData.profile.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <SkillProgress value={skill.level} />
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {portfolioData.profile.projects.length > 0 && (
          <motion.section
            id="projects"
            className="container max-w-screen-lg py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <h2 className="text-center text-3xl font-bold tracking-tight">My Projects</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {portfolioData.profile.projects.map((project, index) => {
                const placeholder = PlaceHolderImages.find(p => p.id === `project-${index + 1}`);
                return (
                <Card key={project.name} className="overflow-hidden transition-shadow hover:shadow-xl">
                  <CardHeader>
                    {placeholder && (
                      <Image 
                        src={placeholder.imageUrl}
                        alt={project.name}
                        width={600}
                        height={400}
                        className="mb-4 aspect-[3/2] w-full rounded-md object-cover"
                        data-ai-hint={placeholder.imageHint}
                      />
                    )}
                    <CardTitle className="flex items-center justify-between">
                      <span>{project.name}</span>
                      <div className="flex items-center gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <LinkIcon className="h-4 w-4" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent><p>View Project</p></TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                           <Tooltip>
                             <TooltipTrigger asChild>
                              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <Github className="h-4 w-4" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent><p>GitHub Repository</p></TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <div key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )})}
            </div>
          </motion.section>
        )}
        
        {/* Contact Section */}
        <motion.section
          id="contact"
          className="container max-w-screen-lg py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
            <p className="mt-4 text-muted-foreground">
              I'm currently open to new opportunities. Feel free to reach out via email or connect with me on social media.
            </p>
            <div className="mt-8 flex justify-center gap-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={`mailto:${portfolioData.profile.email}`} className="text-muted-foreground transition-colors hover:text-primary">
                      <Mail className="h-8 w-8" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>{portfolioData.profile.email}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={`tel:${portfolioData.profile.phone}`} className="text-muted-foreground transition-colors hover:text-primary">
                      <Phone className="h-8 w-8" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>{portfolioData.profile.phone}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={portfolioData.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                      <Linkedin className="h-8 w-8" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>LinkedIn Profile</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={portfolioData.profile.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                      <Github className="h-8 w-8" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>GitHub Profile</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {portfolioData.profile.instagram && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href={portfolioData.profile.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                        <Instagram className="h-8 w-8" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent><p>Instagram Profile</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {portfolioData.profile.facebook && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href={portfolioData.profile.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                        <Facebook className="h-8 w-8" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent><p>Facebook Profile</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by {portfolioData.profile.name}. &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
      
    </div>
  );
}
