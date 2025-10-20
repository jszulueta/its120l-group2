import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import { BookOpen, TrendingUp, Bell, FileText, Users, LogOut, Plus, Edit, Trash2, Search, Filter, Download, Eye, X, Camera } from 'lucide-react-native';

// Main App Component with Navigation
export default function BookmeApp() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const renderScreen = () => {
    switch(currentScreen) {
      case 'login': return <LoginScreen onLogin={(role) => { setUserRole(role); setCurrentScreen('dashboard'); }} />;
      case 'register': return <RegisterScreen onBack={() => setCurrentScreen('login')} />;
      case 'dashboard': return <DashboardScreen userRole={userRole} onNavigate={setCurrentScreen} />;
      case 'books': return <BookManagementScreen onNavigate={setCurrentScreen} onSelectBook={setSelectedBook} />;
      case 'addBook': return <AddBookScreen onBack={() => setCurrentScreen('books')} />;
      case 'editBook': return <EditBookScreen book={selectedBook} onBack={() => setCurrentScreen('books')} />;
      case 'forecast': return <ForecastScreen onNavigate={setCurrentScreen} />;
      case 'notifications': return <NotificationsScreen onNavigate={setCurrentScreen} />;
      case 'reports': return <ReportsScreen onNavigate={setCurrentScreen} />;
      case 'userManagement': return <UserManagementScreen onNavigate={setCurrentScreen} />;
      case 'profile': return <ProfileScreen onNavigate={setCurrentScreen} onLogout={() => { setCurrentScreen('login'); setUserRole(null); }} />;
      default: return <LoginScreen onLogin={(role) => { setUserRole(role); setCurrentScreen('dashboard'); }} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      {renderScreen()}
    </SafeAreaView>
  );
}

// Login Screen
function LoginScreen({ onLogin }: { onLogin: (role: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      const role = email.includes('admin') ? 'Admin' : 'Staff';
      onLogin(role);
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };

  return (
    <View style={styles.authContainer}>
      <View style={styles.authCard}>
        <BookOpen size={64} color="#1e3a8a" style={{ marginBottom: 16 }} />
        <Text style={styles.authTitle}>Bookme</Text>
        <Text style={styles.authSubtitle}>AI-Driven Inventory Forecasting</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Register Screen
function RegisterScreen({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', contactNumber: ''
  });

  return (
    <ScrollView style={styles.fullScreen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register</Text>
      </View>
      
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="First Name" value={formData.firstName} onChangeText={(text) => setFormData({...formData, firstName: text})} />
        <TextInput style={styles.input} placeholder="Last Name" value={formData.lastName} onChangeText={(text) => setFormData({...formData, lastName: text})} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={formData.email} onChangeText={(text) => setFormData({...formData, email: text})} />
        <TextInput style={styles.input} placeholder="Contact Number" keyboardType="phone-pad" value={formData.contactNumber} onChangeText={(text) => setFormData({...formData, contactNumber: text})} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={formData.password} onChangeText={(text) => setFormData({...formData, password: text})} />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={formData.confirmPassword} onChangeText={(text) => setFormData({...formData, confirmPassword: text})} />
        
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Dashboard Screen
function DashboardScreen({ userRole, onNavigate }: { userRole: string | null; onNavigate: (screen: string) => void }) {
  const stats = [
    { label: 'Total Books', value: '1,247', color: '#3b82f6' },
    { label: 'Low Stock', value: '23', color: '#ef4444' },
    { label: 'Overstock', value: '8', color: '#f59e0b' },
    { label: 'Sales Today', value: '₱12,450', color: '#10b981' },
  ];

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back, {userRole}</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickActionButton icon={<BookOpen size={24} color="#fff" />} label="Books" onPress={() => onNavigate('books')} />
            <QuickActionButton icon={<TrendingUp size={24} color="#fff" />} label="Forecast" onPress={() => onNavigate('forecast')} />
            <QuickActionButton icon={<Bell size={24} color="#fff" />} label="Alerts" onPress={() => onNavigate('notifications')} />
            <QuickActionButton icon={<FileText size={24} color="#fff" />} label="Reports" onPress={() => onNavigate('reports')} />
            {userRole === 'Admin' && (
              <QuickActionButton icon={<Users size={24} color="#fff" />} label="Users" onPress={() => onNavigate('userManagement')} />
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Selling Books</Text>
          {['The Great Gatsby', 'To Kill a Mockingbird', '1984'].map((book, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bookIconContainer}>
                <BookOpen size={20} color="#1e3a8a" />
              </View>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemTitle}>{book}</Text>
                <Text style={styles.listItemSubtitle}>{150 - (index * 20)} sold this month</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <View style={styles.alertCard}>
            <View style={[styles.alertDot, { backgroundColor: '#ef4444' }]} />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Low Stock Alert</Text>
              <Text style={styles.alertText}>The Catcher in the Rye - Only 5 copies left</Text>
            </View>
          </View>
          <View style={styles.alertCard}>
            <View style={[styles.alertDot, { backgroundColor: '#f59e0b' }]} />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Overstock Alert</Text>
              <Text style={styles.alertText}>Moby Dick - 45 copies, slow movement</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation active="dashboard" onNavigate={onNavigate} />
    </View>
  );
}

// Book Management Screen
function BookManagementScreen({ onNavigate, onSelectBook }: { onNavigate: (screen: string) => void; onSelectBook: (book: any) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', isbn: '9780743273565', quantity: 45, price: 450 },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', isbn: '9780451524935', quantity: 32, price: 380 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', isbn: '9780061120084', quantity: 28, price: 420 },
  ];

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Management</Text>
        <TouchableOpacity onPress={() => onNavigate('addBook')} style={styles.headerButton}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6b7280" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#1e3a8a" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {books.map((book) => (
          <View key={book.id} style={styles.bookCard}>
            <View style={styles.bookCardHeader}>
              <View style={styles.bookCardInfo}>
                <Text style={styles.bookCardTitle}>{book.title}</Text>
                <Text style={styles.bookCardAuthor}>{book.author}</Text>
                <Text style={styles.bookCardDetails}>
                  {book.genre} • ISBN: {book.isbn}
                </Text>
              </View>
              <View style={styles.bookCardActions}>
                <TouchableOpacity onPress={() => { onSelectBook(book); onNavigate('editBook'); }} style={styles.iconButton}>
                  <Edit size={18} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bookCardFooter}>
              <View style={styles.bookCardStat}>
                <Text style={styles.bookCardStatLabel}>Quantity</Text>
                <Text style={styles.bookCardStatValue}>{book.quantity}</Text>
              </View>
              <View style={styles.bookCardStat}>
                <Text style={styles.bookCardStatLabel}>Price</Text>
                <Text style={styles.bookCardStatValue}>₱{book.price}</Text>
              </View>
              <View style={[styles.stockBadge, book.quantity < 20 ? styles.lowStock : styles.inStock]}>
                <Text style={styles.stockBadgeText}>{book.quantity < 20 ? 'Low Stock' : 'In Stock'}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomNavigation active="books" onNavigate={onNavigate} />
    </View>
  );
}

// Add Book Screen
function AddBookScreen({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    title: '', author: '', genre: '', isbn: '', quantity: '', price: ''
  });

  return (
    <ScrollView style={styles.fullScreen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Book</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Book Title</Text>
        <TextInput style={styles.input} placeholder="Enter book title" value={formData.title} onChangeText={(text) => setFormData({...formData, title: text})} />
        
        <Text style={styles.inputLabel}>Author</Text>
        <TextInput style={styles.input} placeholder="Enter author name" value={formData.author} onChangeText={(text) => setFormData({...formData, author: text})} />
        
        <Text style={styles.inputLabel}>Genre</Text>
        <TextInput style={styles.input} placeholder="Enter genre" value={formData.genre} onChangeText={(text) => setFormData({...formData, genre: text})} />
        
        <Text style={styles.inputLabel}>ISBN</Text>
        <TextInput style={styles.input} placeholder="Enter ISBN" value={formData.isbn} onChangeText={(text) => setFormData({...formData, isbn: text})} />
        
        <Text style={styles.inputLabel}>Quantity</Text>
        <TextInput style={styles.input} placeholder="Enter quantity" keyboardType="numeric" value={formData.quantity} onChangeText={(text) => setFormData({...formData, quantity: text})} />
        
        <Text style={styles.inputLabel}>Price (₱)</Text>
        <TextInput style={styles.input} placeholder="Enter price" keyboardType="numeric" value={formData.price} onChangeText={(text) => setFormData({...formData, price: text})} />
        
        <TouchableOpacity style={styles.primaryButton} onPress={onBack}>
          <Text style={styles.primaryButtonText}>Add Book</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={onBack}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Edit Book Screen
function EditBookScreen({ book, onBack }: { book: any; onBack: () => void }) {
  if (!book) return null;
  
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    isbn: book.isbn,
    quantity: book.quantity.toString(),
    price: book.price.toString()
  });

  return (
    <ScrollView style={styles.fullScreen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Book</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Book Title</Text>
        <TextInput style={styles.input} value={formData.title} onChangeText={(text) => setFormData({...formData, title: text})} />
        
        <Text style={styles.inputLabel}>Author</Text>
        <TextInput style={styles.input} value={formData.author} onChangeText={(text) => setFormData({...formData, author: text})} />
        
        <Text style={styles.inputLabel}>Genre</Text>
        <TextInput style={styles.input} value={formData.genre} onChangeText={(text) => setFormData({...formData, genre: text})} />
        
        <Text style={styles.inputLabel}>ISBN</Text>
        <TextInput style={styles.input} value={formData.isbn} onChangeText={(text) => setFormData({...formData, isbn: text})} />
        
        <Text style={styles.inputLabel}>Quantity</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={formData.quantity} onChangeText={(text) => setFormData({...formData, quantity: text})} />
        
        <Text style={styles.inputLabel}>Price (₱)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={formData.price} onChangeText={(text) => setFormData({...formData, price: text})} />
        
        <TouchableOpacity style={styles.primaryButton} onPress={onBack}>
          <Text style={styles.primaryButtonText}>Update Book</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={onBack}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Forecast Screen
function ForecastScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const forecasts = [
    { book: 'The Great Gatsby', current: 45, predicted: 72, confidence: 87, trend: 'up' },
    { book: '1984', current: 32, predicted: 48, confidence: 92, trend: 'up' },
    { book: 'To Kill a Mockingbird', current: 28, predicted: 35, confidence: 78, trend: 'up' },
  ];

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Demand Forecast</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Filter size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <TrendingUp size={24} color="#3b82f6" />
          <Text style={styles.infoCardText}>
            AI-powered predictions based on historical sales and seasonal trends
          </Text>
        </View>

        {forecasts.map((forecast, index) => (
          <View key={index} style={styles.forecastCard}>
            <Text style={styles.forecastBookTitle}>{forecast.book}</Text>
            <View style={styles.forecastStats}>
              <View style={styles.forecastStat}>
                <Text style={styles.forecastStatLabel}>Current Stock</Text>
                <Text style={styles.forecastStatValue}>{forecast.current}</Text>
              </View>
              <View style={styles.forecastArrow}>
                <Text style={styles.forecastArrowText}>→</Text>
              </View>
              <View style={styles.forecastStat}>
                <Text style={styles.forecastStatLabel}>Predicted Demand</Text>
                <Text style={[styles.forecastStatValue, { color: '#3b82f6' }]}>{forecast.predicted}</Text>
              </View>
            </View>
            <View style={styles.forecastFooter}>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceBadgeText}>
                  {forecast.confidence}% Confidence
                </Text>
              </View>
              <Text style={styles.forecastAction}>
                Recommend: Order {forecast.predicted - forecast.current} more
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomNavigation active="forecast" onNavigate={onNavigate} />
    </View>
  );
}

// Notifications Screen
function NotificationsScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const notifications = [
    { type: 'low', title: 'Low Stock Alert', message: 'The Catcher in the Rye - Only 5 copies left', time: '10 min ago' },
    { type: 'over', title: 'Overstock Alert', message: 'Moby Dick - 45 copies, slow movement', time: '1 hour ago' },
    { type: 'forecast', title: 'Forecast Alert', message: 'High demand predicted for Classic genre next week', time: '3 hours ago' },
  ];

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {notifications.map((notif, index) => (
          <View key={index} style={styles.notificationCard}>
            <View style={[
              styles.notificationDot,
              { backgroundColor: notif.type === 'low' ? '#ef4444' : notif.type === 'over' ? '#f59e0b' : '#3b82f6' }
            ]} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notif.title}</Text>
              <Text style={styles.notificationMessage}>{notif.message}</Text>
              <Text style={styles.notificationTime}>{notif.time}</Text>
            </View>
            <TouchableOpacity style={styles.notificationClose}>
              <X size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <BottomNavigation active="notifications" onNavigate={onNavigate} />
    </View>
  );
}

// Reports Screen
function ReportsScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const reports = [
    { type: 'Sales Report', description: 'Daily, weekly, and monthly sales summaries', icon: <FileText size={32} color="#3b82f6" /> },
    { type: 'Inventory Report', description: 'Current stock levels and movement history', icon: <BookOpen size={32} color="#10b981" /> },
    { type: 'Forecast Report', description: 'Predicted demand and restocking quantities', icon: <TrendingUp size={32} color="#f59e0b" /> },
  ];

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports</Text>
      </View>

      <ScrollView style={styles.content}>
        {reports.map((report, index) => (
          <View key={index} style={styles.reportCard}>
            <View style={styles.reportIcon}>{report.icon}</View>
            <View style={styles.reportContent}>
              <Text style={styles.reportType}>{report.type}</Text>
              <Text style={styles.reportDescription}>{report.description}</Text>
            </View>
            <View style={styles.reportActions}>
              <TouchableOpacity style={styles.reportActionButton}>
                <Eye size={20} color="#3b82f6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.reportActionButton}>
                <Download size={20} color="#10b981" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Options</Text>
          <TouchableOpacity style={styles.exportButton}>
            <FileText size={20} color="#fff" />
            <Text style={styles.exportButtonText}>Export as PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.exportButton, { backgroundColor: '#10b981' }]}>
            <FileText size={20} color="#fff" />
            <Text style={styles.exportButtonText}>Export as Excel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation active="reports" onNavigate={onNavigate} />
    </View>
  );
}

// User Management Screen
function UserManagementScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const users = [
    { name: 'John Doe', email: 'john@bookme.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@bookme.com', role: 'Staff', status: 'Active' },
    { name: 'Bob Johnson', email: 'bob@bookme.com', role: 'Staff', status: 'Inactive' },
  ];

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('dashboard')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Management</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {users.map((user, index) => (
          <View key={index} style={styles.userCard}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{user.name.charAt(0)}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={styles.userMeta}>
                <View style={[styles.roleBadge, user.role === 'Admin' ? styles.adminBadge : styles.staffBadge]}>
                  <Text style={styles.roleBadgeText}>{user.role}</Text>
                </View>
                <View style={[styles.statusBadge, user.status === 'Active' ? styles.activeBadge : styles.inactiveBadge]}>
                  <Text style={styles.statusBadgeText}>{user.status}</Text>
                </View>
              </View>
            </View>
            <View style={styles.userActions}>
              <TouchableOpacity style={styles.iconButton}>
                <Edit size={18} color="#3b82f6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Trash2 size={18} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Profile Screen
function ProfileScreen({ onNavigate, onLogout }: { onNavigate: (screen: string) => void; onLogout: () => void }) {
  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('dashboard')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>A</Text>
          </View>
          <Text style={styles.profileName}>Admin User</Text>
          <Text style={styles.profileEmail}>admin@bookme.com</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.profileOption}>
            <Edit size={20} color="#1e3a8a" />
            <Text style={styles.profileOptionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileOption}>
            <Camera size={20} color="#1e3a8a" />
            <Text style={styles.profileOptionText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileOption} onPress={onLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={[styles.profileOptionText, { color: '#ef4444' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Quick Action Button Component
function QuickActionButton({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
      <View style={styles.quickActionIcon}>{icon}</View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// Bottom Navigation Component
function BottomNavigation({ active, onNavigate }: { active: string; onNavigate: (screen: string) => void }) {
  const navItems = [
    { id: 'dashboard', icon: <BookOpen size={24} />, label: 'Home' },
    { id: 'books', icon: <BookOpen size={24} />, label: 'Books' },
    { id: 'forecast', icon: <TrendingUp size={24} />, label: 'Forecast' },
    { id: 'notifications', icon: <Bell size={24} />, label: 'Alerts' },
    { id: 'reports', icon: <FileText size={24} />, label: 'Reports' },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.navItem}
          onPress={() => onNavigate(item.id)}
        >
          <View style={active === item.id ? styles.navIconActive : styles.navIcon}>
            {React.cloneElement(item.icon as React.ReactElement, { 
              color: active === item.id ? '#1e3a8a' : '#9ca3af' 
            })}
          </View>
          <Text style={active === item.id ? styles.navLabelActive : styles.navLabel}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  authCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  authTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#93c5fd',
    marginTop: 4,
  },
  headerButton: {
    padding: 8,
  },
  backButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    padding: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 16,
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bookIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  alertDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 4,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#6b7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    padding: 8,
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bookCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  bookCardInfo: {
    flex: 1,
  },
  bookCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  bookCardAuthor: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  bookCardDetails: {
    fontSize: 12,
    color: '#9ca3af',
  },
  bookCardActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  bookCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  bookCardStat: {
    alignItems: 'center',
  },
  bookCardStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  bookCardStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  stockBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  lowStock: {
    backgroundColor: '#fee2e2',
  },
  inStock: {
    backgroundColor: '#d1fae5',
  },
  stockBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCardText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#1e40af',
  },
  forecastCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  forecastBookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  forecastStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  forecastStat: {
    flex: 1,
    alignItems: 'center',
  },
  forecastStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  forecastStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  forecastArrow: {
    paddingHorizontal: 16,
  },
  forecastArrowText: {
    fontSize: 24,
    color: '#6b7280',
  },
  forecastFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  confidenceBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  confidenceBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e40af',
  },
  forecastAction: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 4,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  notificationClose: {
    padding: 8,
  },
  markAllRead: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reportIcon: {
    marginRight: 16,
  },
  reportContent: {
    flex: 1,
  },
  reportType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  reportActions: {
    flexDirection: 'row',
  },
  reportActionButton: {
    padding: 8,
    marginLeft: 8,
  },
  exportButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  userMeta: {
    flexDirection: 'row',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  adminBadge: {
    backgroundColor: '#dbeafe',
  },
  staffBadge: {
    backgroundColor: '#f3f4f6',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeBadge: {
    backgroundColor: '#d1fae5',
  },
  inactiveBadge: {
    backgroundColor: '#fee2e2',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  userActions: {
    flexDirection: 'row',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  profileOption: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    marginBottom: 4,
  },
  navIconActive: {
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  navLabelActive: {
    fontSize: 12,
    color: '#1e3a8a',
    fontWeight: '600',
  },
});