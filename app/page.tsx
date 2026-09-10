import GradientPanel from "./gradient-panel";

const lmsProviders = [
	{ icon: "./integrations/moodle.svg", name: "Moodle" },
	{ icon: "./integrations/canvas.svg", name: "Canvas" },
	{ icon: "./integrations/blackboard.svg", name: "Blackboard" },
	{ icon: "./integrations/brightspace.svg", name: "Brightspace" },
] as const;

const gitProviders = [
	{
		icon: "./integrations/github.svg",
		name: "GitHub",
	},
	{
		icon: "./integrations/gitlab.svg",
		name: "GitLab",
	},
	{
		icon: "./integrations/bitbucket.svg",
		name: "Bitbucket",
	},
] as const;

export default function HomePage() {
	return (
		<main className="relative h-[100svh] overflow-hidden bg-avon-paper">
			<div
				aria-label="Page content"
				className="content-scroll"
				data-content-scroll
				tabIndex={0}
			>
				<div className="relative z-10 my-12 flex flex-col px-16 pr-[calc(var(--avon-field)+8rem)] max-[900px]:my-8 max-[900px]:px-[18px] max-[900px]:pr-[18px] max-[560px]:my-6 max-[560px]:px-[14px] max-[560px]:pr-[14px]">
					<header
						className="fixed left-0 top-12 z-[2] flex min-h-7 w-full items-center px-16 transition-opacity delay-0 duration-100 will-change-[opacity] max-[900px]:top-8 max-[900px]:px-[18px] max-[560px]:top-6 max-[560px]:px-[14px] motion-reduce:transition-none"
						data-content-logo
					>
						<a
							aria-label="Avon home"
							className="inline-flex items-center gap-[11px] text-avon-ink no-underline outline-offset-[5px] focus-visible:outline-2"
							href="./"
						>
							<img
								alt=""
								className="block h-7 w-12 object-contain [filter:brightness(0)]"
								height="1000"
								src="./avon-logo.svg"
								width="1000"
							/>
						</a>
					</header>

					<div aria-hidden="true" className="h-6" />

					<section
						aria-labelledby="page-title"
						className="mt-[232px] mb-[200px] max-w-[72ch] max-[900px]:mt-[120px] max-[900px]:mb-[96px] max-[560px]:mt-[88px] max-[560px]:mb-[72px]"
					>
						<h1
							className="text-avon-h1 font-medium leading-[1.15em] tracking-[-.02em] text-balance"
							id="page-title"
						>
							Coursework is evolving, and so are we.
						</h1>
					</section>

					<section className="my-10 max-w-[72ch] md:my-14">
						<div className="flex flex-col gap-5 text-avon-small font-normal leading-[1.3em] tracking-[-.01em]">
							<p>
								Coursework is where understanding becomes practical. A project
								or task asks a student to make choices, test ideas, and produce
								something they can explain, not just repeat something they have
								read.
							</p>
							<p>
								But the systems around coursework have barely changed. Students
								move between their VLE, Git provider, local tools, and
								submission forms; lecturers repeat the same setup and then
								reconstruct a student's progress from whatever is left at the
								deadline.
							</p>
							<p>
								LLMs have made that gap harder to ignore. Universities have
								responded with detectors and in-person presentations, while
								leaving less room for a more useful question: how can AI be used
								within the rules of the coursework, and how can the work remain
								assessable when it is?
							</p>
							<p>
								Avon is building the workflow around the work itself: from the
								course activity and template, through each push, test, and
								submission, to the feedback and assessment that follow.
							</p>
						</div>
					</section>

					<section className="my-10 max-w-[72ch] md:my-14">
						<h2 className="mb-4 text-avon-small font-normal leading-[1.3em] tracking-[-.01em] text-avon-mute">
							What we're building
						</h2>
						<div className="flex flex-col gap-5 text-avon-small font-normal leading-[1.3em] tracking-[-.01em]">
							<p>Our plan is simple:</p>
							<ol className="my-4 flex flex-col gap-2">
								<li className="flex gap-4">
									<span className="w-4 shrink-0 tabular-nums text-avon-mute">
										1
									</span>
									<span>
										Let students work in environments they already know.
									</span>
								</li>
								<li className="flex gap-4">
									<span className="w-4 shrink-0 tabular-nums text-avon-mute">
										2
									</span>
									<span>Remove repetitive setup for lecturers.</span>
								</li>
								<li className="flex gap-4">
									<span className="w-4 shrink-0 tabular-nums text-avon-mute">
										3
									</span>
									<span>
										Make AI use visible and controllable within each brief.
									</span>
								</li>
								<li className="flex gap-4">
									<span className="w-4 shrink-0 tabular-nums text-avon-mute">
										4
									</span>
									<span>
										Assess the work across its lifespan, not only the final
										file.
									</span>
								</li>
							</ol>
							<p>
								The current product focuses on the parts of computing coursework
								that are hardest to coordinate. Instructors launch from their
								VLE, choose a Git location, set the name, deadline, and marks,
								then upload starter code and tests or push them through Git.
							</p>
							<p>
								Avon then gives the coursework a consistent runtime, provisions
								student repositories, and brings the student's commits, test
								runs, and chosen submission into the same flow. The aim is to
								make the work easier to start, easier to follow, and easier to
								assess.
							</p>
						</div>
					</section>

					<section className="my-10 max-w-[72ch] md:my-14">
						<h2 className="mb-4 text-avon-small font-normal leading-[1.3em] tracking-[-.01em] text-avon-mute">
							AI and the work
						</h2>
						<div className="flex flex-col gap-5 text-avon-small font-normal leading-[1.3em] tracking-[-.01em]">
							<p>
								AI detectors can produce a score, but they do not show whether a
								student understood a decision or can defend it. An in-person
								presentation can help, but it is expensive to repeat and arrives
								after most of the work is already done.
							</p>
							<p>
								Avon's direction is to treat AI as part of the coursework
								policy, not as a hidden exception. A lecturer should be able to
								say what is allowed, whether that means brainstorming, code
								assistance, or no AI, and the system should preserve enough context to review that
								choice.
							</p>
							<p>
								Where AI is allowed, it should support learning. Where it is
								not, the restriction should be explicit and enforceable. Either
								way, assessment should have more to work with than a final
								answer: changes in the repository, test runs, submitted commits,
								and the student's response to feedback.
							</p>
						</div>
					</section>

					<section className="my-10 max-w-[72ch] md:my-14">
						<h2 className="mb-4 text-avon-small font-normal leading-[1.3em] tracking-[-.01em] text-avon-mute">
							Built around the work
						</h2>
						<div className="flex flex-col gap-5 text-avon-small font-normal leading-[1.3em] tracking-[-.01em]">
							<p>
								For a lecturer, the flow starts with the course activity. Choose
								where the coursework belongs, name it, set a deadline and
								maximum marks, then add the code and tests students will begin
								from and be graded against.
							</p>
							<p>
								The runtime is defined once and built consistently. Avon can
								verify the template, provision individual or team repositories,
								and connect the activity back to the VLE students already use.
							</p>
							<p>
								For a student, that means connecting a Git account, opening the
								coursework repository in a familiar tool, pushing work, running
								available checks, and choosing the commit that represents the
								submission before the deadline.
							</p>
						</div>
					</section>

					<section className="my-10 max-w-[72ch] md:my-14">
						<h2 className="mb-4 text-avon-small font-normal leading-[1.3em] tracking-[-.01em] text-avon-mute">
							Connect the tools you already use
						</h2>
						<div className="flex flex-col gap-5 text-avon-small font-normal leading-[1.3em] tracking-[-.01em]">
							<p>
								One LTI 1.3 link is all it takes to set up Avon in your LMS. It
								works with
								{lmsProviders.map((provider, index) => (
									<span className="whitespace-nowrap" key={provider.name}>
										{index === 0
											? " "
											: index === lmsProviders.length - 1
												? " and "
												: ", "}
										<img
											alt=""
											className="inline-block size-[1em] align-[-0.1em] object-contain"
											src={provider.icon}
										/>{" "}
										{provider.name}
									</span>
								))}
								{"."}
							</p>
							<p>
								The code can stay in the Git provider your course already uses:
								{gitProviders.map((provider, index) => (
									<span className="whitespace-nowrap" key={provider.name}>
										{index === 0
											? " "
											: index === gitProviders.length - 1
												? " and "
												: ", "}
										<img
											alt=""
											className="inline-block size-[1em] align-[-0.1em] object-contain"
											src={provider.icon}
										/>{" "}
										{provider.name}
									</span>
								))}
								{"."}{" "}Avon connects the coursework flow around them instead
								of asking students or staff to move everything into another
								system.
							</p>
						</div>
					</section>

					<section className="my-10 max-w-[72ch] md:my-14">
						<h2 className="mb-4 text-avon-small font-normal leading-[1.3em] tracking-[-.01em] text-avon-mute">
							Where Avon is going
						</h2>
						<div className="flex flex-col gap-5 text-avon-small font-normal leading-[1.3em] tracking-[-.01em]">
							<p>
								Avon is early, but the foundation is concrete: LTI launch and
								deep linking, instructor coursework setup, Git template
								repositories, reproducible Docker environments, student access,
								commit-based submissions, and test-run status.
							</p>
							<p>
								The next layer is the part that is still being built: a
								connected view of class progress, submissions, tests, rubric
								checks, feedback, and grades. Alongside that, Avon should give
								course teams a clear way to define, monitor, and enforce their
								AI rules without reducing a student's work to a detector score.
							</p>
							<p>
								The principle is simple: make the work easier to start, easier
								to understand, and more honest to assess. If Avon can keep the
								student's process visible while giving lecturers less manual
								work, it will be doing the job it is being built to do.
							</p>
						</div>
					</section>

					<footer className="mt-20 max-w-[72ch] md:mt-28">
						<nav
							aria-label="Footer"
							className="flex items-center gap-5 text-avon-small font-normal leading-[1.3em] tracking-[-.01em] text-avon-ink max-[560px]:flex-wrap max-[560px]:gap-x-5 max-[560px]:gap-y-[14px]"
						>
							<span>avon.ac</span>
							<span
								aria-hidden="true"
								className="h-px w-8 min-w-1.5 shrink-[999] bg-avon-line max-[560px]:hidden"
							/>
							<a
								className="no-underline outline-offset-[5px] hover:text-avon-blue focus-visible:outline-2 focus-visible:outline-avon-blue"
								href="mailto:hello@avon.ac"
							>
								hello@avon.ac
							</a>
							<span
								aria-hidden="true"
								className="h-px min-w-1.5 flex-1 bg-avon-line max-[560px]:hidden"
							/>
							<a
								className="no-underline outline-offset-[5px] hover:text-avon-blue focus-visible:outline-2 focus-visible:outline-avon-blue"
								href="https://github.com/avon-vle"
								target="_blank"
								rel="noopener"
							>
								github
							</a>
						</nav>
					</footer>
				</div>
			</div>

			<GradientPanel />
		</main>
	);
}
