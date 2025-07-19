import { FadeIn } from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      {/* Top-left logo */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <Link href="/" aria-label="Home">
          <Image src="/EFOF Logo.png" alt="Education for Our Future Logo" width={180} height={60} className="h-16 w-auto hover:opacity-90 transition-opacity duration-200" />
        </Link>
      </div>
      <div className="sticky top-0 left-0 z-50 block md:hidden bg-transparent pt-4 pl-4">
        <Link href="/" aria-label="Home">
          <Image src="/EFOF Logo.png" alt="Education for Our Future Logo" width={140} height={48} className="h-14 w-auto hover:opacity-90 transition-opacity duration-200" />
        </Link>
      </div>
      <div className="min-h-screen bg-background">
        <FadeIn delay={100}>
          <section className="pt-32 pb-20 text-center relative overflow-hidden bg-secondary">
            <div className="container mx-auto px-6 relative z-10">
              <div className="relative inline-block mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground relative z-10">Get In Touch</h1>
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-primary rounded-full"></div>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Have questions or want to learn more about our work? We'd love to hear from you.
              </p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={200}>
          <section className="py-20 bg-secondary">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-200"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-200"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn delay={300}>
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-2xl font-bold mb-8 text-center text-foreground">Other Ways to Reach Us</h3>
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-200">
                      <h4 className="text-primary font-medium mb-3">Email</h4>
                      <p className="text-muted-foreground">info@edufund.com</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-200">
                      <h4 className="text-primary font-medium mb-3">Phone</h4>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-200">
                      <h4 className="text-primary font-medium mb-3">Office</h4>
                      <p className="text-muted-foreground">123 Education Ave<br />San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <Footer />
      </div>
    </>
  );
}
