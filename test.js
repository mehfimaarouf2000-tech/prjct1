import random
import time
import sys

class MathematicalSacrifice:
    def __init__(self):
        self.player_name = ""
        self.energy = 100
        self.time_remaining = 120  # minutes
        self.chances = 3
        self.level = 1
        self.sacrifices_made = []
        self.game_over = False
        
    def type_text(self, text, delay=0.03):
        """Print text with a typewriter effect"""
        for char in text:
            print(char, end='', flush=True)
            time.sleep(delay)
        print()
    
    def display_status(self):
        """Show player's current resources"""
        print("\n" + "="*50)
        print(f"LEVEL {self.level} | Energy: {self.energy} | Time: {self.time_remaining} min | Chances: {self.chances}")
        print("="*50)
    
    def make_sacrifice(self, sacrifice_type, amount):
        """Handle player sacrifices"""
        if sacrifice_type == "energy":
            if self.energy - amount <= 0:
                return False
            self.energy -= amount
            self.sacrifices_made.append(f"Lost {amount} energy")
        elif sacrifice_type == "time":
            if self.time_remaining - amount <= 0:
                return False
            self.time_remaining -= amount
            self.sacrifices_made.append(f"Lost {amount} minutes")
        elif sacrifice_type == "chance":
            if self.chances - amount <= 0:
                return False
            self.chances -= amount
            self.sacrifices_made.append(f"Lost {amount} chance(s)")
        
        return True
    
    def generate_math_problem(self, difficulty):
        """Generate math problems based on difficulty level"""
        if difficulty == 1:
            a = random.randint(1, 10)
            b = random.randint(1, 10)
            operation = random.choice(["+", "-", "*"])
            if operation == "+":
                answer = a + b
                problem = f"{a} + {b}"
            elif operation == "-":
                # Ensure positive result
                a, b = max(a, b), min(a, b)
                answer = a - b
                problem = f"{a} - {b}"
            else:  # multiplication
                answer = a * b
                problem = f"{a} × {b}"
                
        elif difficulty == 2:
            operation = random.choice(["exponent", "fraction", "percentage"])
            if operation == "exponent":
                base = random.randint(2, 5)
                exponent = random.randint(2, 3)
                answer = base ** exponent
                problem = f"{base} raised to the power of {exponent}"
            elif operation == "fraction":
                numerator = random.randint(1, 5)
                denominator = random.randint(2, 6)
                # Simplify if possible
                if numerator % denominator == 0:
                    answer = numerator // denominator
                    problem = f"{numerator}/{denominator} (simplified)"
                else:
                    answer = numerator / denominator
                    problem = f"{numerator}/{denominator} (as decimal)"
            else:  # percentage
                number = random.randint(10, 50)
                percentage = random.randint(10, 90)
                answer = number * percentage / 100
                problem = f"{percentage}% of {number}"
                
        else:  # difficulty 3
            operation = random.choice(["algebra", "sequence", "geometry"])
            if operation == "algebra":
                x = random.randint(2, 10)
                coefficient = random.randint(2, 5)
                constant = random.randint(1, 10)
                answer = x
                problem = f"If {coefficient}x + {constant} = {coefficient*x + constant}, what is x?"
            elif operation == "sequence":
                start = random.randint(1, 10)
                difference = random.randint(2, 5)
                position = random.randint(3, 6)
                answer = start + difference * (position - 1)
                problem = f"What is the {position}th term in the sequence: {start}, {start+difference}, {start+2*difference}, ..."
            else:  # geometry
                shape = random.choice(["triangle", "rectangle", "circle"])
                if shape == "triangle":
                    base = random.randint(5, 15)
                    height = random.randint(5, 15)
                    answer = 0.5 * base * height
                    problem = f"Area of a triangle with base {base} and height {height}"
                elif shape == "rectangle":
                    length = random.randint(5, 15)
                    width = random.randint(5, 15)
                    answer = length * width
                    problem = f"Area of a rectangle with length {length} and width {width}"
                else:  # circle
                    radius = random.randint(3, 10)
                    answer = round(3.14 * radius * radius, 2)
                    problem = f"Area of a circle with radius {radius} (use π=3.14)"
        
        return problem, answer
    
    def present_riddle(self):
        """Present a mathematical riddle to the player"""
        difficulty = min(self.level, 3)  # Cap difficulty at 3
        
        self.type_text(f"\nA mysterious figure emerges from the shadows...")
        self.type_text(f"\"To proceed to Level {self.level+1}, you must solve this riddle of numbers.\"")
        
        problem, correct_answer = self.generate_math_problem(difficulty)
        
        self.type_text(f"\nThe figure presents you with: {problem}")
        
        # Offer sacrifice options
        self.type_text("\n\"But first, you must choose your sacrifice:\"")
        print("1. Sacrifice 15 Energy (Current: {})".format(self.energy))
        print("2. Sacrifice 10 Minutes (Current: {})".format(self.time_remaining))
        print("3. Sacrifice 1 Chance (Current: {})".format(self.chances))
        
        while True:
            try:
                choice = int(input("\nYour choice (1-3): "))
                if choice not in [1, 2, 3]:
                    raise ValueError
                break
            except ValueError:
                self.type_text("Invalid choice. The figure grows impatient.")
        
        sacrifice_types = {1: ("energy", 15), 2: ("time", 10), 3: ("chance", 1)}
        sacrifice_type, amount = sacrifice_types[choice]
        
        if not self.make_sacrifice(sacrifice_type, amount):
            self.type_text("You don't have enough to make that sacrifice!")
            self.type_text("The figure laughs mockingly as you fade into nothingness.")
            self.game_over = True
            return
        
        self.type_text(f"\nYou feel a part of yourself fade as you make the sacrifice...")
        time.sleep(1)
        
        # Present the problem
        self.type_text("\n\"Now, solve this!\"")
        
        # Give a hint based on sacrifice
        hints = {
            "energy": "The numbers seem clearer with your reduced vitality.",
            "time": "Time slows down, giving you a moment to think.",
            "chance": "With fewer chances, your mind focuses intensely."
        }
        self.type_text(hints[sacrifice_type])
        
        # Get player's answer
        while True:
            try:
                player_answer = float(input("\nYour answer: "))
                break
            except ValueError:
                self.type_text("That is not a valid number. Try again.")
        
        # Check answer
        tolerance = 0.01  # For floating point comparisons
        if abs(player_answer - correct_answer) < tolerance:
            self.type_text("\n\"CORRECT!\" The figure steps aside.")
            self.level += 1
            # Reward for correct answer
            if sacrifice_type == "energy":
                self.energy += 5  # Small energy boost
            elif sacrifice_type == "time":
                self.time_remaining += 2  # Small time bonus
            # No bonus for chance sacrifice - too risky!
        else:
            self.type_text(f"\n\"WRONG! The answer was {correct_answer}.\"")
            self.type_text("The figure's form seems to grow larger and more menacing.")
            self.chances -= 1
            if self.chances <= 0:
                self.type_text("You have no chances left. The realm claims you.")
                self.game_over = True
    
    def random_event(self):
        """Random events that can help or hinder the player"""
        if random.random() < 0.3:  # 30% chance of an event
            event_type = random.choice(["help", "hinder"])
            
            if event_type == "help":
                help_type = random.choice(["energy", "time", "chance"])
                if help_type == "energy":
                    gain = random.randint(5, 15)
                    self.energy = min(100, self.energy + gain)
                    self.type_text(f"\nA glowing orb appears and restores {gain} energy!")
                elif help_type == "time":
                    gain = random.randint(5, 10)
                    self.time_remaining += gain
                    self.type_text(f"\nTime seems to reverse, granting you {gain} extra minutes!")
                else:  # chance
                    if self.chances < 3:
                        self.chances += 1
                        self.type_text("\nA second chance materializes before you!")
            
            else:  # hinder
                hinder_type = random.choice(["energy", "time"])
                if hinder_type == "energy":
                    loss = random.randint(5, 10)
                    self.energy -= loss
                    self.type_text(f"\nA shadowy presence drains {loss} energy from you!")
                else:  # time
                    loss = random.randint(5, 15)
                    self.time_remaining -= loss
                    self.type_text(f"\nTime accelerates, costing you {loss} minutes!")
                
                if self.energy <= 0 or self.time_remaining <= 0:
                    self.game_over = True
    
    def display_ending(self):
        """Display appropriate ending based on player's performance"""
        if self.level > 5:
            self.type_text("\n" + "="*60)
            self.type_text("CONGRATULATIONS! You have mastered the realm of mathematical sacrifice!")
            self.type_text(f"You reached Level {self.level} with {self.energy} energy and {self.time_remaining} minutes remaining.")
            self.type_text("The shadows part, revealing a path to freedom.")
            self.type_text("You have proven that even in a world ruled by logic, the human spirit can triumph.")
        else:
            self.type_text("\n" + "="*60)
            self.type_text("DEFEAT! The realm of numbers has consumed you.")
            self.type_text(f"You reached Level {self.level} before falling.")
            self.type_text("Your sacrifices were in vain as you fade into the silence of mathematical oblivion.")
        
        if self.sacrifices_made:
            self.type_text("\nSacrifices you made along the way:")
            for sacrifice in self.sacrifices_made:
                self.type_text(f"- {sacrifice}")
    
    def play(self):
        """Main game loop"""
        # Introduction
        print("="*70)
        self.type_text("In a world ruled by logic and numbers, every step forward demands a sacrifice.")
        self.type_text("You stand at the edge of a realm where mistakes carry a heavy price,")
        self.type_text("and only the sharpest minds survive.")
        print("="*70)
        
        self.player_name = input("\nEnter your name, seeker: ")
        self.type_text(f"\nWelcome, {self.player_name}. Your journey begins now.")
        
        # Game loop
        while not self.game_over and self.level <= 10:
            self.display_status()
            
            # Check if resources are depleted
            if self.energy <= 0:
                self.type_text("Your energy has been completely drained. You collapse.")
                self.game_over = True
                break
            if self.time_remaining <= 0:
                self.type_text("Time has run out. The realm claims you.")
                self.game_over = True
                break
            
            # Present level
            self.type_text(f"\nYou stand before the gateway to Level {self.level + 1}.")
            
            # Random event
            self.random_event()
            if self.game_over:
                break
                
            # Present riddle
            self.present_riddle()
            
            # Brief pause between levels
            if not self.game_over and self.level <= 10:
                time.sleep(2)
        
        # Game ending
        self.display_ending()

# Run the game
if __name__ == "__main__":
    game = MathematicalSacrifice()
    game.play()