(function(){
  const startBtn = document.getElementById('start-btn')
  const endBtn = document.getElementById('end-btn')
  const readingText = document.getElementById('reading-text')

  // New ordering setup elements
  const orderingSetup = document.getElementById('ordering-setup')
  const conditionPoolEl = document.getElementById('condition-pool')
  const sequenceSlotsEl = document.getElementById('sequence-slots')
  const beginTrialBtn = document.getElementById('begin-trial')
  const randomizeBtn = document.getElementById('randomize-sequence')
  const clearBtn = document.getElementById('clear-sequence')

  // Conditions (single-attribute modifications; other attributes remain default)
  const readingArea = document.querySelector('.reading-area')
  const CONDITIONS = [
    { id:'default', label:'Default (Arial, 17px, black on white)', apply: ()=>{/* defaults are applied in reset */} },
    { id:'size-small', label:'Size: Small (10px)', apply: ()=>{ if (readingText) readingText.style.fontSize='10px' } },
    { id:'size-large', label:'Size: Large (24px)', apply: ()=>{ if (readingText) readingText.style.fontSize='24px' } },
    { id:'font-verdana', label:'Font: Verdana', apply: ()=>{ if (readingText) readingText.style.fontFamily='Verdana' } },
    { id:'font-inter', label:'Font: Inter', apply: ()=>{ if (readingText) readingText.style.fontFamily='Inter' } },
    { id:'color-wb', label:'Color: White on Black', apply: ()=>{ if (readingText) readingText.style.color='#ffffff'; if (readingArea) readingArea.style.background='#000000'; } },
    { id:'color-bblue', label:'Color: Black on Light Blue', apply: ()=>{ if (readingText) readingText.style.color='#000000'; if (readingArea) readingArea.style.background='#dbeafe'; } },
    { id:'color-bred', label:'Color: Black on Light Red', apply: ()=>{ if (readingText) readingText.style.color='#000000'; if (readingArea) readingArea.style.background='#fee2e2'; } },
  ]

  const DEFAULTS = {
    fontFamily: 'Arial',
    fontSize: '17px',
    color: '#000000',
    background: '#ffffff'
  }

  // Load sections (expect 8) from server context
  let sections = []
  const sectionsEl = document.getElementById('sections-data')
  if (sectionsEl) {
    try { sections = JSON.parse(sectionsEl.textContent) } catch(e) { console.warn('Failed to parse sections-data', e) }
  }
  if (!Array.isArray(sections) || sections.length === 0) {
    sections = ["Look, I didn’t want to be a half-blood. If you’re reading this because you think you might be one, my advice is: close this book right now. Believe whatever lie your mom or dad told you about your birth, and try to lead a normal life.",
                "Being a half-blood is dangerous. It’s scary. Most of the time, it gets you killed in painful, nasty ways. If you’re a normal kid, reading this because you think it’s fiction, great. Read on. I envy you for being able to believe that none of this ever happened. But if you recognize yourself in these pages—if you feel something stirring inside—stop reading immediately. You might be one of us. And once you know that, it’s only a matter of time before they sense it too, and they’ll come for you.",
                "Don’t say I didn’t warn you. My name is Percy Jackson. I’m twelve years old. Until a few months ago, I was a boarding student at Yancy Academy, a private school for troubled kids in upstate New York. Am I a troubled kid? Yeah. You could say that. I could start at any point in my short miserable life to prove it, but things really started going bad last May, when our sixth-grade class took a field trip to Manhattan— twenty-eight mental-case kids and two teachers on a yellow school bus, heading to the Metropolitan Museum of Art to look at ancient Greek and Roman stuff. I know—it sounds like torture. Most Yancy field trips were. But Mr. Brunner, our Latin teacher, was leading this trip, so I had hopes. Mr. Brunner was this middle-aged guy in a motorized wheelchair.",
                "He had thinning hair and a scruffy beard and a frayed tweed jacket, which always smelled like coffee. You wouldn’t think he’d be cool, but he told stories and jokes and let us play games in class.",
                "He also had this awesome collection of Roman armor and weapons, so he was the only teacher whose class didn’t put me to sleep. I hoped the trip would be okay. At least, I hoped that for once I wouldn’t get in trouble. Boy, was I wrong. See, bad things happen to me on field trips, like at my fifth-grade school. When we went to the Saratoga battlefield, I had this accident with a Revolutionary War cannon. I wasn’t aiming for the school bus, but of course I got expelled anyway.",
                "And before that, at my fourth-grade school, when we took a behind-the-scenes tour of the Marine World shark pool, I sort of hit the wrong lever on the catwalk and our class took an unplanned swim. And the time before that, well you get the idea. This trip, I was determined to be good. All the way into the city, I put up with Nancy Bobofit, the freckly, redheaded kleptomaniac girl, hitting my best friend Grover in the back of the head with chunks of peanut butter-and-ketchup sandwich. Grover was an easy target. He was scrawny. He cried when he got frustrated. He must’ve been held back several grades, because he was the only sixth grader with acne and the start of a wispy beard on his chin. On top of all that, he was crippled. He had a note excusing him from PE for the rest of his life because he had some kind of muscular disease in his legs.",
                "He walked funny, like every step hurt him, but don’t let that fool you. You should’ve seen him run when it was enchilada day in the cafeteria. Anyway, Nancy Bobofit was throwing wads of sandwich that stuck in his curly brown hair,",
                "and she knew I couldn’t do anything back to her because I was already on probation. The headmaster had threatened me with death by in-school suspension if anything bad, embarrassing, or even mildly entertaining happened on this trip. “I’m going to kill her,” I mumbled. Grover tried to calm me down. “It’s okay. I like peanut butter.” He dodged another piece of Nancy’s lunch. “That’s it.” I started to get up, but Grover pulled me back to my seat. “You’re already on probation,” he reminded me.",
                "“You know who’ll get blamed if anything happens.” Looking back on it, I wish I’d decked Nancy Bobofit right then and there. In-school suspension would’ve been nothing compared to the mess I was about to get myself into. Mr. Brunner led the museum tour. He rode up front in his wheelchair, guiding us through the big echoey galleries, past marble statues and glass cases full of really old black-and-orange pottery. It blew my mind that this stuff had survived for two thousand, three thousand years. He gathered us around a thirteen-foot-tall stone column with a big sphinx on the top, and started telling us how it was a grave marker, a stele, for a girl about our age. He told us about the carvings on the sides. I was trying to listen to what he had to say, because it was kind of interesting, but everybody around me was talking,",
                "and every time I told them to shut up, the other teacher chaperone, Mrs. Dodds, would give me the evil eye. Mrs. Dodds was this little math teacher from Georgia who always wore a black leather jacket, even though she was fifty years old.",
                "She looked mean enough to ride a Harley right into your locker. She had come to Yancy halfway through the year, when our last math teacher had a nervous breakdown. From her first day, Mrs. Dodds loved Nancy Bobofit and figured I was devil spawn. She would point her crooked finger at me and say, “Now, honey,” real sweet, and I knew I was going to get afterschool detention for a month. One time, after she’d made me erase answers out of old math workbooks until midnight, I told Grover I didn’t think Mrs. Dodds was human.",
                "He looked at me, real serious, and said, “You’re absolutely right.” Mr. Brunner kept talking about Greek funeral art. Finally, Nancy Bobofit snickered something about the naked guy on the stele, and I turned around and said, “Will you shut up?” It came out louder than I meant it to. The whole group laughed. Mr. Brunner stopped his story. “Mr. Jackson,” he said, “did you have a comment?” My face was totally red. I said, “No, sir.” Mr. Brunner pointed to one of the pictures on the stele. “Perhaps you’ll tell us what this picture represents?” I looked at the carving, and felt a flush of relief, because I actually recognized it. “That’s Kronos eating his kids, right?” “Yes,” Mr. Brunner said, obviously not satisfied. “And he did this because . . .” “Well . . .” I racked my brain to remember. “Kronos was the king god, and—”",
                "“God?” Mr. Brunner asked. “Titan,” I corrected myself. “And . . . he didn’t trust his kids, who were the gods. So, um, Kronos ate them, right?” “But his wife hid baby Zeus, and gave Kronos a rock to eat instead.”",
                "“And later, when Zeus grew up, he tricked his dad, Kronos, into barfing up his brothers and sisters—” “Eeew!” said one of the girls behind me. “—and so there was this big fight between the gods and the Titans,” I continued, “and the gods won.” Some snickers from the group. Behind me, Nancy Bobofit mumbled to a friend, “Like we’re going to use this in real life. Like it’s going to say on our job applications, ‘Please explain why Kronos ate his kids.’” “And why, Mr. Jackson,” Brunner said,",
                "“to paraphrase Miss Bobofit’s excellent question, does this matter in real life?” “Busted,” Grover muttered. “Shut up,” Nancy hissed, her face even brighter red than her hair. At least Nancy got packed, too. Mr. Brunner was the only one who ever caught her saying anything wrong. He had radar ears. I thought about his question, and shrugged. “I don’t know, sir.” “I see.” Mr. Brunner looked disappointed. “Well, half credit, Mr. Jackson. Zeus did indeed feed Kronos a mixture of mustard and wine, which made him disgorge his other five children, who, of course, being immortal gods, had been living and growing up completely undigested in the Titan’s stomach. “The gods defeated their father, sliced him to pieces with his own scythe, and scattered his remains in Tartarus, the darkest part of the Underworld.",
                "“On that happy note, it’s time for lunch. Mrs. Dodds, would you lead us back outside?” The class drifted off, the girls holding their stomachs, the guys pushing each other around and acting like doofuses.",
                "Grover and I were about to follow when Mr. Brunner said, “Mr. Jackson.” I knew that was coming. I told Grover to keep going. Then I turned toward Mr. Brunner. “Sir?” Mr. Brunner had this look that wouldn’t let you go— intense brown eyes that could’ve been a thousand years old and had seen everything. “You must learn the answer to my question,” Mr. Brunner told me. “About the Titans?” “About real life. And how your studies apply to it.” “Oh.” “What you learn from me,” he said, “is vitally important.",
                "“I expect you to treat it as such. I will accept only the best from you, Percy Jackson.” I wanted to get angry, this guy pushed me so hard. I mean, sure, it was kind of cool on tournament days, when he dressed up in a suit of Roman armor and shouted: “What ho!” and challenged us, sword-point against chalk, to run to the board and name every Greek and Roman person who had ever lived, and their mother, and what god they worshipped. But Mr. Brunner expected me to be as good as everybody else, despite the fact that I have dyslexia and attention deficit disorder and I had never made above a C– in my life. No—he didn’t expect me to be as good; he expected me to be better. And I just couldn’t learn all those names and facts, much less spell them correctly.",
                "I mumbled something about trying harder, while Mr. Brunner took one long sad look at the stele, like he’d been at this girl’s funeral. He told me to go outside and eat my lunch. The class gathered on the front steps of the museum,",
                "where we could watch the foot traffic along Fifth Avenue. Overhead, a huge storm was brewing, with clouds blacker than I’d ever seen over the city. I figured maybe it was global warming or something, because the weather all across New York state had been weird since Christmas. We’d had massive snow storms, flooding, wildfires from lightning strikes. I wouldn’t have been surprised if this was a hurricane blowing in. Nobody else seemed to notice. Some of the guys were pelting pigeons with Lunchables crackers.",
                "Nancy Bobofit was trying to pickpocket something from a lady’s purse, and, of course, Mrs. Dodds wasn’t seeing a thing. Grover and I sat on the edge of the fountain, away from the others. We thought that maybe if we did that, everybody wouldn’t know we were from that school—the school for loser freaks who couldn’t make it elsewhere. “Detention?” Grover asked. “Nah,” I said. “Not from Brunner. I just wish he’d lay off me sometimes. I mean—I’m not a genius.” Grover didn’t say anything for a while. Then, when I thought he was going to give me some deep philosophical comment to make me feel better, he said, “Can I have your apple?” I didn’t have much of an appetite, so I let him take it. I watched the stream of cabs going down Fifth Avenue, and thought about my mom’s apartment, only a little ways uptown from where we sat.",
                "I hadn’t seen her since Christmas. I wanted so bad to jump in a taxi and head home. She’d hug me and be glad to see me, but she’d be disappointed, too. She’d send me right back to Yancy, remind me that I had to try harder,",
                "even if this was my sixth school in six years and I was probably going to be kicked out again. I wouldn’t be able to stand that sad look she’d give me. Mr. Brunner parked his wheelchair at the base of the handicapped ramp. He ate celery while he read a paperback novel. A red umbrella stuck up from the back of his chair, making it look like a motorized café table. I was about to unwrap my sandwich when Nancy Bobofit appeared in front of me with her ugly friends—I guess she’d gotten tired of stealing from the tourists—and dumped her half-eaten lunch in Grover’s lap.",
                "“Oops.” She grinned at me with her crooked teeth. Her freckles were orange, as if somebody had spray-painted her face with liquid Cheetos. I tried to stay cool. The school counselor had told me a million times, “Count to ten, get control of your temper.” But I was so mad my mind went blank. A wave roared in my ears. I don’t remember touching her, but the next thing I knew, Nancy was sitting on her butt in the fountain, screaming, “Percy pushed me!” Mrs. Dodds materialized next to us. Some of the kids were whispering: “Did you see—” “—the water—” “—like it grabbed her—” I didn’t know what they were talking about. All I knew was that I was in trouble again. As soon as Mrs. Dodds was sure poor little Nancy was okay, promising to get her a new shirt at the museum gift shop, etc., etc., Mrs. Dodds turned on me. There was a triumphant fire in her eyes."]
  }

  // State - now 8 conditions (each repeats 3 times for 24 total trials)
  let sequence = Array(8).fill(null) // store condition ids (including default)
  let currentIndex = 0
  let started = false

  function resetReadingStyles(){
    if (readingText){
      readingText.style.fontFamily = DEFAULTS.fontFamily
      readingText.style.fontSize = DEFAULTS.fontSize
      readingText.style.color = DEFAULTS.color
      readingText.style.background = 'transparent'
    }
    if (readingArea){
      readingArea.style.background = DEFAULTS.background
    }
  }

  function applyCondition(id){
    const cond = CONDITIONS.find(c=>c.id===id)
    resetReadingStyles()
    if (cond) cond.apply()
  }

  function renderPool(){
    conditionPoolEl.innerHTML=''
    // Include all conditions (including default)
    CONDITIONS.forEach(cond=>{
      const used = sequence.includes(cond.id)
      const pill = document.createElement('button')
      pill.type='button'
      pill.className='condition-pill'+(used?' used':'')
      pill.textContent=cond.label
      pill.disabled = used
      pill.addEventListener('click', ()=>addCondition(cond.id))
      conditionPoolEl.appendChild(pill)
    })
  }

  function renderSequence(){
    sequenceSlotsEl.innerHTML=''
    sequence.forEach((condId, idx)=>{
      const slot = document.createElement('div')
      slot.className='slot'
      const label = document.createElement('span')
      label.className='label'
      const startTrial = idx * 3 + 1
      const endTrial = startTrial + 2
      label.textContent = `Trials ${startTrial}-${endTrial}`
      const value = document.createElement('span')
      value.className='value'
      value.textContent = condId ? CONDITIONS.find(c=>c.id===condId).label : '—'
      slot.appendChild(label)
      slot.appendChild(value)
      if (condId){
        const clearBtn = document.createElement('button')
        clearBtn.type='button'
        clearBtn.className='clear'
        clearBtn.textContent='x'
        clearBtn.addEventListener('click', ()=>{ sequence[idx]=null; updateUI() })
        slot.appendChild(clearBtn)
      }
      sequenceSlotsEl.appendChild(slot)
    })
    const filled = sequence.every(id=>id!==null)
    if (beginTrialBtn) beginTrialBtn.disabled = !filled
  }

  function addCondition(id){
    const firstEmpty = sequence.findIndex(s=>s===null)
    if (firstEmpty === -1) return
    sequence[firstEmpty]=id
    updateUI()
  }

  function randomizeSequence(){
    const shuffled = CONDITIONS.slice().sort(()=>Math.random()-0.5).slice(0,8)
    sequence = shuffled.map(c=>c.id)
    updateUI()
  }

  function clearSequence(){
    sequence = Array(8).fill(null)
    updateUI()
  }

  function updateUI(){
    renderPool()
    renderSequence()
  }

  // Trial begin hides ordering setup and shows start/end controls
  if (beginTrialBtn) beginTrialBtn.addEventListener('click', ()=>{
    if (!sequence.every(id=>id!==null)) return
    if (orderingSetup) orderingSetup.classList.add('hidden')
    const top = document.querySelector('.top-action'); const bottom=document.querySelector('.bottom-action')
    if (top) top.classList.remove('hidden')
    if (bottom) bottom.classList.remove('hidden')
    currentIndex = 0; started=false
    showMessage('Press Start to begin.')
    if (startBtn){ startBtn.disabled = false; startBtn.classList.remove('hidden') }
    if (endBtn) endBtn.disabled = true
    resetReadingStyles()
    startBtn && startBtn.focus()
  })

  if (randomizeBtn) randomizeBtn.addEventListener('click', randomizeSequence)
  if (clearBtn) clearBtn.addEventListener('click', clearSequence)

  function showMessage(msg){ if (readingText) readingText.textContent = msg }
  function showSection(idx){ if (readingText) readingText.textContent = sections[idx] }

  if (startBtn) startBtn.disabled = true
  if (endBtn){
    endBtn.disabled = true
    endBtn.classList.add('hidden') // keep end button hidden until first Start
  }
  showMessage('Select order of 8 conditions (each repeats 3 times), then Begin trial.')
  updateUI()

  if (startBtn) startBtn.addEventListener('click', ()=>{
    if (currentIndex >= sections.length){
      showMessage('No more sections.')
      startBtn.disabled = true
      return
    }
    // Apply condition for this section (each condition repeats for 3 trials)
    const conditionGroupIndex = Math.floor(currentIndex / 3)
    const condId = sequence[conditionGroupIndex]
    applyCondition(condId)
    showSection(currentIndex)
    started = true
    startBtn.disabled = true
    startBtn.classList.add('hidden')
    if (endBtn){
      endBtn.disabled = false
      endBtn.classList.remove('hidden')
    }
  })

  if (endBtn) endBtn.addEventListener('click', ()=>{
    if (!started) return
    started = false
    currentIndex += 1
    resetReadingStyles() // revert to defaults between sections
    if (currentIndex >= sections.length){
      showMessage('All sections complete.')
      if (startBtn){ startBtn.disabled = true; startBtn.classList.add('hidden') }
  if (endBtn){ endBtn.disabled = true; endBtn.classList.add('hidden') }
    } else {
      showMessage('Press start to read next section.')
      if (startBtn){ startBtn.disabled = false; startBtn.classList.remove('hidden') }
  if (endBtn){ endBtn.disabled = true; endBtn.classList.add('hidden') }
    }
  })
})();
