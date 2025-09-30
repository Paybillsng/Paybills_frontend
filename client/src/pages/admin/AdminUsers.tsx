import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Plus, 
  Eye, 
  Edit, 
  UserX, 
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Wallet
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended' | 'pending';
  balance: number;
  joinDate: string;
  kycStatus: 'verified' | 'pending' | 'rejected';
  userType: 'regular' | 'agent' | 'admin';
  lastActive: string;
  totalTransactions: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Zainab Abubakar',
    email: 'zainab@email.com',
    phone: '+2348012345678',
    status: 'active',
    balance: 125750,
    joinDate: '2024-01-15',
    kycStatus: 'verified',
    userType: 'regular',
    lastActive: '2024-01-20',
    totalTransactions: 247,
  },
  {
    id: '2',
    name: 'Mr. Adebayo',
    email: 'adebayo@business.com',
    phone: '+2348087654321',
    status: 'active',
    balance: 89230,
    joinDate: '2024-02-20',
    kycStatus: 'verified',
    userType: 'agent',
    lastActive: '2024-01-19',
    totalTransactions: 156,
  },
  {
    id: '3',
    name: 'Chidi Okafor',
    email: 'chidi@student.com',
    phone: '+2348011223344',
    status: 'pending',
    balance: 15000,
    joinDate: '2024-03-10',
    kycStatus: 'pending',
    userType: 'regular',
    lastActive: '2024-01-18',
    totalTransactions: 23,
  },
  {
    id: '4',
    name: 'Fatima Hassan',
    email: 'fatima@company.ng',
    phone: '+2348055667788',
    status: 'active',
    balance: 67500,
    joinDate: '2024-02-05',
    kycStatus: 'verified',
    userType: 'agent',
    lastActive: '2024-01-20',
    totalTransactions: 89,
  },
  {
    id: '5',
    name: 'Emeka Obi',
    email: 'emeka@startup.ng',
    phone: '+2348099887766',
    status: 'suspended',
    balance: 0,
    joinDate: '2024-01-30',
    kycStatus: 'rejected',
    userType: 'regular',
    lastActive: '2024-01-15',
    totalTransactions: 12,
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesUserType = userTypeFilter === 'all' || user.userType === userTypeFilter;
    
    return matchesSearch && matchesStatus && matchesUserType;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      suspended: 'destructive',
      pending: 'secondary',
      verified: 'default',
      rejected: 'destructive',
    };
    
    return (
      <Badge 
        variant={variants[status as keyof typeof variants] as any}
        className={status === 'active' || status === 'verified' ? 'bg-success text-white' : ''}
      >
        {status}
      </Badge>
    );
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleUserAction = (userId: string, action: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    switch (action) {
      case 'suspend':
        setUsers(users.map(u => 
          u.id === userId ? { ...u, status: 'suspended' as const } : u
        ));
        toast({
          title: "User Suspended",
          description: `${user.name} has been suspended.`,
          variant: "destructive",
        });
        break;
      case 'activate':
        setUsers(users.map(u => 
          u.id === userId ? { ...u, status: 'active' as const } : u
        ));
        toast({
          title: "User Activated",
          description: `${user.name} has been activated.`,
        });
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
          setUsers(users.filter(u => u.id !== userId));
          toast({
            title: "User Deleted",
            description: `${user.name} has been deleted.`,
            variant: "destructive",
          });
        }
        break;
    }
  };

  const exportUsers = (format: 'csv' | 'pdf') => {
    toast({
      title: "Export Started",
      description: `Exporting users as ${format.toUpperCase()}...`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage user accounts, permissions, and activities
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportUsers('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => exportUsers('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">
                  {users.filter(u => u.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">
                  {users.filter(u => u.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">
                  {users.filter(u => u.status === 'suspended').length}
                </p>
                <p className="text-sm text-muted-foreground">Suspended Users</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setUserTypeFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Users ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>KYC</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-white text-sm">
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(user.status)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(user.kycStatus)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.userType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Wallet className="w-4 h-4 mr-1 text-muted-foreground" />
                          {formatCurrency(user.balance)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{user.totalTransactions}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(user.lastActive).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <DropdownMenuItem 
                                onClick={() => handleUserAction(user.id, 'suspend')}
                                className="text-destructive"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleUserAction(user.id, 'activate')}
                                className="text-success"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* User Details Modal */}
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {selectedUser.name}</div>
                      <div><strong>Email:</strong> {selectedUser.email}</div>
                      <div><strong>Phone:</strong> {selectedUser.phone}</div>
                      <div><strong>User Type:</strong> {selectedUser.userType}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Account Status</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Status:</strong> {getStatusBadge(selectedUser.status)}</div>
                      <div><strong>KYC:</strong> {getStatusBadge(selectedUser.kycStatus)}</div>
                      <div><strong>Joined:</strong> {new Date(selectedUser.joinDate).toLocaleDateString()}</div>
                      <div><strong>Last Active:</strong> {new Date(selectedUser.lastActive).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Financial Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Wallet Balance:</strong> {formatCurrency(selectedUser.balance)}</div>
                    <div><strong>Total Transactions:</strong> {selectedUser.totalTransactions}</div>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
              {selectedUser && (
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    handleUserAction(selectedUser.id, 'suspend');
                    setSelectedUser(null);
                  }}
                >
                  {selectedUser.status === 'active' ? 'Suspend User' : 'Activate User'}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
