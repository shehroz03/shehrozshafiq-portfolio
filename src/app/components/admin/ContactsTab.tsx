import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Trash2, CheckCircle, Circle, Calendar, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { api } from '../../lib/supabase';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  read: boolean;
  readAt?: string;
}

export function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('auth_token');
      if (!token) {
        toast.error('Session expired. Please login again.');
        return;
      }

      const data = await api.getContacts(token);
      setContacts(data.contacts);
    } catch (error: any) {
      console.error('Fetch contacts error:', error);
      toast.error('Failed to load contacts', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (contact: Contact) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        toast.error('Session expired');
        return;
      }

      await api.markContactAsRead(contact.id, token);
      
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, read: true, readAt: new Date().toISOString() } : c
      ));

      if (selectedContact?.id === contact.id) {
        setSelectedContact({ ...contact, read: true, readAt: new Date().toISOString() });
      }

      toast.success('Marked as read');
    } catch (error: any) {
      console.error('Mark as read error:', error);
      toast.error('Failed to mark as read', {
        description: error.message,
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        toast.error('Session expired');
        return;
      }

      await api.deleteContact(id, token);
      setContacts(contacts.filter(c => c.id !== id));
      
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }

      toast.success('Contact deleted successfully');
    } catch (error: any) {
      console.error('Delete contact error:', error);
      toast.error('Failed to delete contact', {
        description: error.message,
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const unreadCount = contacts.filter(c => !c.read).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[#4A90E2] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2E2E2E]">Contact Submissions</h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Manage messages from your portfolio contact form
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {unreadCount} Unread
          </Badge>
          <Badge variant="outline" className="text-sm">
            {contacts.length} Total
          </Badge>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2">No contact submissions yet</h3>
          <p className="text-[#6B7280]">
            Messages from your contact form will appear here
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contacts List */}
          <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedContact(contact);
                  if (!contact.read) {
                    handleMarkAsRead(contact);
                  }
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedContact?.id === contact.id
                    ? 'bg-blue-50 border-blue-200'
                    : contact.read
                    ? 'bg-white border-gray-200 hover:border-gray-300'
                    : 'bg-blue-50/30 border-blue-100 hover:border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#6B7280]" />
                    <p className={`font-semibold text-sm ${!contact.read ? 'text-[#2E2E2E]' : 'text-[#6B7280]'}`}>
                      {contact.name}
                    </p>
                  </div>
                  {!contact.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
                <p className="text-xs text-[#6B7280] mb-2 truncate">
                  {contact.email}
                </p>
                <p className="text-sm text-[#6B7280] line-clamp-2 mb-2">
                  {contact.message}
                </p>
                <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                  <Calendar className="w-3 h-3" />
                  {formatDate(contact.submittedAt)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            {selectedContact ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2E2E2E]">
                        {selectedContact.name}
                      </h3>
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-sm text-[#4A90E2] hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedContact.read ? (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Read
                      </Badge>
                    ) : (
                      <Badge variant="default" className="gap-1 bg-blue-500">
                        <Circle className="w-3 h-3" />
                        Unread
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(selectedContact.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Submitted Date */}
                  <div>
                    <p className="text-xs font-medium text-[#6B7280] mb-1">Submitted</p>
                    <p className="text-sm text-[#2E2E2E]">
                      {formatDate(selectedContact.submittedAt)}
                    </p>
                  </div>

                  {selectedContact.readAt && (
                    <div>
                      <p className="text-xs font-medium text-[#6B7280] mb-1">Read</p>
                      <p className="text-sm text-[#2E2E2E]">
                        {formatDate(selectedContact.readAt)}
                      </p>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <p className="text-xs font-medium text-[#6B7280] mb-2">Message</p>
                    <div className="bg-[#F7F7F7] rounded-xl p-4 border border-gray-200">
                      <p className="text-sm text-[#2E2E2E] whitespace-pre-wrap leading-relaxed">
                        {selectedContact.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200 flex gap-3">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white gap-2"
                    >
                      <a href={`mailto:${selectedContact.email}`}>
                        <Mail className="w-4 h-4" />
                        Reply via Email
                      </a>
                    </Button>
                    {!selectedContact.read && (
                      <Button
                        variant="outline"
                        onClick={() => handleMarkAsRead(selectedContact)}
                        className="gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center h-full flex items-center justify-center">
                <div>
                  <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-[#6B7280]">
                    Select a contact to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
