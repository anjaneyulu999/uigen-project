"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900">Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage your account preferences
        </p>
      </div>

      {/* Profile */}
      <section className="bg-white border border-neutral-200 rounded-xl shadow-sm mb-6">
        <div className="px-6 py-5 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-900">Profile</h2>
          <p className="mt-0.5 text-xs text-neutral-500">Your account details</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="display-name">Display name</Label>
            <Input id="display-name" placeholder="Your name" defaultValue="" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" disabled className="bg-neutral-50 text-neutral-500" />
            <p className="text-xs text-neutral-400">Email cannot be changed</p>
          </div>
          <div className="pt-1">
            <Button size="sm" onClick={handleSave}>
              {saved ? "Saved!" : "Save changes"}
            </Button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white border border-neutral-200 rounded-xl shadow-sm mb-6">
        <div className="px-6 py-5 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-900">Notifications</h2>
          <p className="mt-0.5 text-xs text-neutral-500">Control how you receive updates</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium text-neutral-800">Email notifications</p>
              <p className="text-xs text-neutral-500 mt-0.5">Receive updates about your projects via email</p>
            </div>
            <button
              role="switch"
              aria-checked={emailNotifications}
              onClick={() => setEmailNotifications((v) => !v)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
                emailNotifications ? "bg-blue-600" : "bg-neutral-200"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                  emailNotifications ? "translate-x-4.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>
          <Separator />
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium text-neutral-800">Product updates</p>
              <p className="text-xs text-neutral-500 mt-0.5">Stay informed about new features and improvements</p>
            </div>
            <button
              role="switch"
              aria-checked={false}
              className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 bg-neutral-200"
            >
              <span className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow translate-x-0.5" />
            </button>
          </label>
        </div>
      </section>

      {/* API */}
      <section className="bg-white border border-neutral-200 rounded-xl shadow-sm mb-6">
        <div className="px-6 py-5 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-900">API</h2>
          <p className="mt-0.5 text-xs text-neutral-500">Manage your API access</p>
        </div>
        <div className="px-6 py-5 space-y-3">
          <div className="space-y-1.5">
            <Label>API Key</Label>
            <div className="flex gap-2">
              <Input
                value="sk-•••••••••••••••••••••••••••••••"
                readOnly
                className="font-mono text-sm bg-neutral-50 text-neutral-500"
              />
              <Button variant="outline" size="sm" className="shrink-0">
                Reveal
              </Button>
            </div>
            <p className="text-xs text-neutral-400">Keep your API key secret. Do not share it publicly.</p>
          </div>
          <Button variant="outline" size="sm">
            Regenerate key
          </Button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-white border border-red-200 rounded-xl shadow-sm">
        <div className="px-6 py-5 border-b border-red-100">
          <h2 className="text-sm font-semibold text-red-700">Danger zone</h2>
          <p className="mt-0.5 text-xs text-neutral-500">Irreversible actions</p>
        </div>
        <div className="px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-800">Delete account</p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Permanently delete your account and all data
            </p>
          </div>
          <Button variant="destructive" size="sm" disabled>
            Delete account
          </Button>
        </div>
      </section>
    </div>
  );
}
